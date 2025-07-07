import { expect, test } from "@playwright/experimental-ct-vue";
import type { Locator, Page } from "@playwright/test";
import type { JSX } from "vue/jsx-runtime";
import { ScreenshotMatrix } from "./ScreenshotMatrix";
import type {
  HookContext,
  MatrixScreenshotTestOptions,
  UseMatrixScreenshotTestOptions,
} from "./types";
import { escapeGridAreaName } from "./utils";

/**
 * Creates a screenshot utility that can be used to capture matrix screenshots.
 * Useful for capturing a single screenshot/image that contains multiple variants of a component.
 */
export const useMatrixScreenshotTest = <TContext extends HookContext = HookContext>({
  defaults,
}: UseMatrixScreenshotTestOptions<TContext>) => {
  const executeMatrixScreenshotTest = async <TColumn extends string, TRow extends string>(
    options: MatrixScreenshotTestOptions<TColumn, TRow, TContext>,
  ) => {
    test(`${options.name}`, async ({ mount, page, browserName, context }) => {
      // limit the max timeout per permutation
      const timeoutPerScreenshot = 25 * 1000;
      test.setTimeout(options.columns.length * options.rows.length * timeoutPerScreenshot);

      /**
       * Mounts the given element, captures a screenshot and returns and HTML `<img />` containing the captured screenshot.
       */
      const getScreenshot = async (element: JSX.Element, column: TColumn, row: TRow) => {
        await page.getByRole("document").focus(); // reset focus
        await page.getByRole("document").hover({ position: { x: 0, y: 0 }, force: true }); // reset mouse
        await page.mouse.up(); // reset mouse

        const component = await mount(element);

        // BEFORE hook
        await defaults?.hooks?.beforeEach?.(component, page, column, row, options.context);
        await options.hooks?.beforeEach?.(component, page, column, row, options.context);

        const screenshot = await component.screenshot({ animations: "disabled" });

        // some browser (e.g. safari) have different device resolutions which would cause the screenshot
        // to be twice as large (or more) so we need to get the actual size here to set the correct image size below
        // see (`scale` option of `component.screenshot()` above)
        const box = await component.boundingBox();
        const id = `${escapeGridAreaName(row)}-${escapeGridAreaName(column)}`;

        // AFTER hook
        await defaults?.hooks?.afterEach?.(component, page, column, row, options.context);
        await options.hooks?.afterEach?.(component, page, column, row, options.context);

        return { box, id, screenshot };
      };

      const screenshotMap = new Map<string, Awaited<ReturnType<typeof getScreenshot>>>();

      for (const row of options.rows) {
        for (const column of options.columns) {
          const jsxElement = options.component(column, row);
          const removePadding = options.removePadding ?? defaults?.removePadding;

          const wrappedElement = (
            <div
              style={{
                display: "grid",
                width: "max-content",
                padding: removePadding ? undefined : "1rem",
              }}
            >
              {jsxElement}
            </div>
          );

          const data = await getScreenshot(wrappedElement, column, row);
          screenshotMap.set(data.id, data);
        }
      }

      const SCREENSHOT_ROUTE = "/_playwright-matrix-screenshot";

      await context.route(`${SCREENSHOT_ROUTE}*`, (route, request) => {
        const url = new URL(request.url());
        const wantedId = url.searchParams.get("id") ?? "";

        return route.fulfill({
          status: 200,
          contentType: "image/png",
          body: screenshotMap.get(wantedId)?.screenshot,
        });
      });

      const screenshots = Array.from(screenshotMap.values()).map(({ box, id }) => (
        <img
          width={box?.width}
          height={box?.height}
          style={{ gridArea: id }}
          src={`${SCREENSHOT_ROUTE}?id=${id}`}
          alt={id}
        />
      ));

      const rowLabels = options.rows.map((row) => GridLabel({ name: row, type: "row" }));

      const columnsLabels = options.columns.map((column) =>
        GridLabel({ name: column, type: "column" }),
      );

      const html = ScreenshotMatrix({
        columns: options.columns,
        rows: options.rows,
        name: options.name,
        browserName,
        children: [...screenshots, ...rowLabels, ...columnsLabels],
      });

      const component = await mount(html);
      await expect(component).toHaveScreenshot(`${options.name}.png`);

      await page.unroute(`${SCREENSHOT_ROUTE}*`);
    });
  };

  return {
    /**
     * Creates a single matrix screenshot that includes the screenshots for every column-row combination.
     */
    executeMatrixScreenshotTest,
  };
};

/**
 * Sets the component size to fit all absolute positioned content so it is fully included in screenshots.
 * Useful if component includes flyouts etc. that use CSS `position: absolute`.
 *
 * Will wait for the component to be visible.
 */
export const adjustSizeToAbsolutePosition = async (component: Locator) => {
  await expect(component).toBeVisible();

  await component.evaluate((element) => {
    element.style.height = `${element.scrollHeight}px`;
    element.style.width = `${element.scrollWidth}px`;
  });
};

const GridLabel = (props: { type: "column" | "row"; name: string }) => {
  return (
    <div
      style={{ textAlign: "center", gridArea: `${props.type}-${escapeGridAreaName(props.name)}` }}
    >
      {props.name}
    </div>
  );
};

/**
 * Utility hook for screenshot tests to capture the component in hover, active and focus-visible state.
 *
 * States:
 * - hover: will hover the center of the component
 * - active: will hold the mouse down on the center of the component
 * - focus-visible: press Tab key to focus component
 */
export const useFocusStateHooks = async (component: Locator, page: Page, state: string) => {
  if (state === "hover") {
    await component.hover();
  }
  if (state === "focus-visible") {
    await page.keyboard.press("Tab");
  }
  if (state === "active") {
    const box = (await component.boundingBox())!;
    const center = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    await page.mouse.move(center.x, center.y);
    await page.mouse.down();
  }
};
