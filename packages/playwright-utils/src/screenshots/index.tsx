import type { Locator } from "@playwright/test";
import type { JSX } from "vue/jsx-runtime";
import ScreenshotMatrix from "./ScreenshotMatrix.vue";
import type { MatrixScreenshotTestOptions, UseMatrixScreenshotTestOptions } from "./types";

export const useMatrixScreenshotTest = ({ expect, test }: UseMatrixScreenshotTestOptions) => {
  const executeMatrixScreenshotTest = async <TColumn extends string, TRow extends string>(
    options: MatrixScreenshotTestOptions<TColumn, TRow>,
  ) => {
    test(`${options.name}`, async ({ mount, page, browserName, makeAxeBuilder }) => {
      // limit the max timeout per permutation
      const timeoutPerScreenshot = 25 * 1000;
      test.setTimeout(options.columns.length * options.rows.length * timeoutPerScreenshot);

      /**
       * Mounts the given element, captures a screenshot and returns and HTML `<img />` containing the captured screenshot.
       */
      const getScreenshot = async (element: JSX.Element, column: TColumn, row: TRow) => {
        await page.getByRole("document").focus(); // reset focus
        await page.getByRole("document").hover({ position: { x: 0, y: 0 } }); // reset mouse
        await page.mouse.up(); // reset mouse

        const component = await mount(element);
        await options.beforeScreenshot?.(component, page, column, row);

        const screenshot = await component.screenshot({ animations: "disabled" });

        // some browser (e.g. safari) have different device resolutions which would cause the screenshot
        // to be twice as large (or more) so we need to get the actual size here to set the correct image size below
        // see (`scale` option of `component.screenshot()` above)
        const box = await component.boundingBox();

        // accessibility tests
        const axeBuilder = makeAxeBuilder();
        if (options.disabledAccessibilityRules?.length) {
          axeBuilder.disableRules(options.disabledAccessibilityRules);
        }

        const accessibilityScanResults = await axeBuilder.analyze();
        expect(
          accessibilityScanResults.violations,
          `should pass accessibility checks for ${column} ${row}`,
        ).toEqual([]);

        const id = `${row}-${column}`;

        return (
          <img
            width={box?.width}
            height={box?.height}
            style={{ gridArea: id }}
            src={`data:image/png;base64,${Buffer.from(screenshot).toString("base64")}`}
            alt={id}
          />
        );
      };

      const screenshots: JSX.Element[] = [];

      for (const row of options.rows) {
        for (const column of options.columns) {
          const jsxElement = options.component(column, row);

          const wrappedElement = (
            <div
              style={{
                display: "grid",
                width: "max-content",
                padding: options.disablePadding ? undefined : "1rem",
              }}
            >
              {jsxElement}
            </div>
          );

          const screenshot = await getScreenshot(wrappedElement, column, row);
          screenshots.push(screenshot);
        }
      }

      const component = await mount(
        <ScreenshotMatrix
          columns={options.columns}
          rows={options.rows}
          name={options.name}
          browserName={browserName}
        >
          {screenshots}
        </ScreenshotMatrix>,
      );

      await expect(component).toHaveScreenshot(`${options.name}.png`);
    });
  };

  return {
    /**
     * Creates a single matrix screenshot that includes the screenshots for every column-row combination.
     * Will also perform axe accessibility tests.
     */
    executeMatrixScreenshotTest,
  };
};

/**
 * Sets the component size to fit all absolute positioned content so it is included in screenshots.
 * Useful if component includes flyouts etc.
 */
export const adjustAbsolutePositionScreenshot = async (
  expect: UseMatrixScreenshotTestOptions["expect"],
  component: Locator,
) => {
  await expect(component).toBeVisible();

  await component.evaluate((element) => {
    element.style.height = `${element.scrollHeight}px`;
    element.style.width = `${element.scrollWidth}px`;
  });
};
