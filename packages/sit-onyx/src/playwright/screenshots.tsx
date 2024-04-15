import type { MountResultJsx } from "@playwright/experimental-ct-vue";
import type { JSX } from "vue/jsx-runtime";
import { expect, test } from "../playwright-axe";
import ScreenshotMatrix from "./ScreenshotMatrix.vue";

export type MatrixScreenshotTestOptions<
  TColumn extends string = string,
  TRow extends string = string,
> = {
  /**
   * Test name. Will be displayed above the matrix screenshot and be used as filename.
   */
  name: string;
  /**
   * Matrix columns.
   */
  columns: readonly TColumn[];
  /**
   * Matrix rows.
   */
  rows: readonly TRow[];
  /**
   * Function that returns the component for the given column and row.
   */
  component: (column: TColumn, row: TRow) => JSX.Element;
  /**
   * Optional callback to be executed before capturing the screenshot.
   * Useful for performing `expect()` or e.g. hover, focus-visible state etc.
   */
  beforeScreenshot?: (
    component: MountResultJsx,
    page: TestArgs["page"],
    column: TColumn,
    row: TRow,
  ) => Promise<void>;
  /**
   * Rules to disable when performing the accessibility tests.
   * **IMPORTANT**: Should be avoided! If used, please include a comment why it is needed
   * and if possible create a GitHub issue with follow up work on it.
   *
   * @see https://playwright.dev/docs/accessibility-testing#disabling-individual-scan-rules
   */
  disabledAccessibilityRules?: string[];
};

type TestArgs = Parameters<Parameters<typeof test>[2]>[0];

/**
 * Creates a single matrix screenshot that includes the screenshots for every column-row combination.
 */
export const executeMatrixScreenshotTest = async <TColumn extends string, TRow extends string>(
  options: MatrixScreenshotTestOptions<TColumn, TRow>,
) => {
  test(`${options.name}`, async ({ mount, page, browserName, makeAxeBuilder }) => {
    // limit the max timeout per permutation
    const timeoutPerScreenshot = 10 * 1000;
    test.setTimeout(options.columns.length * options.rows.length * timeoutPerScreenshot);

    /**
     * Mounts the given element, captures a screenshot and returns and HTML `<img />` containing the captured screenshot.
     */
    const getScreenshot = async (element: JSX.Element, column: TColumn, row: TRow) => {
      await page.getByRole("document").focus(); // reset focus
      await page.getByRole("document").hover(); // reset mouse
      await page.mouse.up(); // reset mouse

      const component = await mount(element);
      await options.beforeScreenshot?.(component, page, column, row);

      // accessibility tests
      const accessibilityScanResults = await makeAxeBuilder()
        .disableRules(options.disabledAccessibilityRules ?? [])
        .analyze();
      expect(
        accessibilityScanResults.violations,
        `should pass accessibility checks for ${column} ${row}`,
      ).toEqual([]);

      const screenshot = await component.screenshot({ animations: "disabled" });

      // some browser (e.g. safari) have different device resolutions which would cause the screenshot
      // to be twice as large (or more) so we need to get the actual size here to set the correct image size below
      // see (`scale` option of `component.screenshot()` above)
      const box = await component.boundingBox();

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
          <div style={{ display: "grid", width: "max-content", padding: "1rem" }}>{jsxElement}</div>
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
