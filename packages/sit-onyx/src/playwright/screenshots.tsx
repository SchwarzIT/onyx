import type { MountResultJsx } from "@playwright/experimental-ct-vue";
import type { JSX } from "vue/jsx-runtime";
import { expect, test } from "../playwright/a11y";
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
   * Matrix columns. Must not contain spaces.
   */
  columns: readonly TColumn[];
  /**
   * Matrix rows. Must not contain spaces.
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
};

type TestArgs = Parameters<Parameters<typeof test>[2]>[0];

/**
 * Creates a single matrix screenshot that includes the screenshots for every column-row combination.
 */
export const executeMatrixScreenshotTest = async <TColumn extends string, TRow extends string>(
  options: MatrixScreenshotTestOptions<TColumn, TRow>,
) => {
  test(`${options.name}`, async ({ mount, page, browserName }) => {
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

/**
 * Mock icon to use in Playwright component tests (.tsx files) because Playwright has
 * issues when importing from "@sit-onyx/icons" directly with version 1.42.1.
 *
 * Equivalent to:
 * import mockPlaywrightIcon from "@sit-onyx/icons/emoji-happy-2.svg?raw";
 */
export const mockPlaywrightIcon = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 32 32"><path d="M16 2C8.28 2 2 8.28 2 16s6.28 14 14 14 14-6.28 14-14S23.72 2 16 2m0 26C9.383 28 4 22.617 4 16S9.383 4 16 4s12 5.383 12 12-5.383 12-12 12"/><path d="M11 13c.552 0 1 .449 1 1h2c0-1.654-1.346-3-3-3s-3 1.346-3 3h2c0-.551.448-1 1-1m10-2c-1.654 0-3 1.346-3 3h2a1.001 1.001 0 0 1 2 0h2c0-1.654-1.346-3-3-3m-5 11a5.01 5.01 0 0 1-4.325-2.501l-1.73 1.002C11.193 22.659 13.514 24 16 24s4.807-1.341 6.056-3.499l-1.73-1.002A5.02 5.02 0 0 1 16 22"/></svg>`;
