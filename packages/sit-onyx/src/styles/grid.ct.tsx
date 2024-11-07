/* eslint-disable playwright/expect-expect */
import type { Locator, Page } from "@playwright/test";
import { ONYX_BREAKPOINTS, type OnyxBreakpoint } from "@sit-onyx/shared/breakpoints";
import { expect, test } from "../playwright/a11y";

/**
 * Map of column count per breakpoint.
 */
const GRID_COLUMNS = {
  "2xs": 4,
  xs: 8,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 16,
} satisfies Record<OnyxBreakpoint, number>;

const createGridElement = (
  cols: number,
  className = `onyx-grid-span-${cols}`,
  name = `${cols}`,
) => (
  <div
    class={className}
    style={{
      outline: "1px solid black",
      height: "100px",
      display: "grid",
      placeItems: "center",
    }}
  >
    {name}
  </div>
);

const expectActualGridSpan = async (element: Locator, toBe: number) => {
  const jsValue = await element.evaluateHandle((e) => window.getComputedStyle(e).gridColumnEnd);
  const value = await jsValue.jsonValue();
  return expect(value).toBe(`span ${toBe}`);
};

const fullPageScreenshot = (page: Page, name: string) => {
  return expect(page).toHaveScreenshot(name, { fullPage: true });
};

test.beforeEach(({ page }) => page.addStyleTag({ content: "body { margin: 0; }" }));

Object.entries(GRID_COLUMNS).forEach(([name, columns], i) => {
  test(`all 'onyx-grid-span-*' should have correct column count for ${name} breakpoint`, async ({
    mount,
    page,
  }) => {
    // ARRANGE
    await page.setViewportSize({
      width: ONYX_BREAKPOINTS[name as OnyxBreakpoint] + 1,
      height: 400,
    });
    await mount(
      <main class="onyx-grid onyx-grid-container" style={{ outline: "1px solid red" }}>
        {new Array(16).fill(null).map((_, i) => createGridElement(i + 1))}
      </main>,
    );

    // ASSERT
    await fullPageScreenshot(page, `grid-${name}.png`);
    for (const loc of await page.locator("onyx-grid > div").all()) {
      await expectActualGridSpan(loc, Math.min(i, columns));
    }
  });
});

Object.entries(GRID_COLUMNS).forEach(([name, columns], i) => {
  test(`all 'onyx-grid-span-*' should have correct column count for ${name} breakpoint in max grid md`, async ({
    mount,
    page,
  }) => {
    // ARRANGE
    await page.setViewportSize({
      width: ONYX_BREAKPOINTS[name as OnyxBreakpoint] + 1,
      height: 400,
    });
    await mount(
      <main
        class="onyx-grid onyx-grid-container onyx-grid-max-md"
        style={{ outline: "1px solid red" }}
      >
        {new Array(16).fill(null).map((_, i) => createGridElement(i + 1))}
      </main>,
    );

    // ASSERT
    for (const loc of await page.locator("onyx-grid > div").all()) {
      await expectActualGridSpan(loc, Math.min(i, columns, GRID_COLUMNS.md));
    }
  });
});

Object.entries(GRID_COLUMNS).forEach(([name, columns], i) => {
  test(`all 'onyx-grid-span-*' should have correct column count for ${name} breakpoint in max grid lg`, async ({
    mount,
    page,
  }) => {
    // ARRANGE
    await page.setViewportSize({
      width: ONYX_BREAKPOINTS[name as OnyxBreakpoint] + 1,
      height: 400,
    });
    await mount(
      <main
        class="onyx-grid onyx-grid-container onyx-grid-max-lg"
        style={{ outline: "1px solid red" }}
      >
        {new Array(16).fill(null).map((_, i) => createGridElement(i + 1))}
      </main>,
    );

    // ASSERT
    for (const loc of await page.locator("onyx-grid > div").all()) {
      await expectActualGridSpan(loc, Math.min(i, columns, GRID_COLUMNS.lg));
    }
  });
});

Object.entries(GRID_COLUMNS).forEach(([name], i) => {
  test(`"${name}" breakpoint span should overwrite smaller breakpoint span`, async ({
    mount,
    page,
  }) => {
    // ARRANGE
    await page.setViewportSize({
      width: ONYX_BREAKPOINTS[name as OnyxBreakpoint] + 1,
      height: 400,
    });
    await mount(
      <main class="onyx-grid onyx-grid-container" style={{ outline: "1px solid red" }}>
        {createGridElement(
          NaN,
          `onyx-grid-span-16 onyx-grid-2xs-span-1 onyx-grid-xs-span-2 onyx-grid-sm-span-3 onyx-grid-md-span-4 onyx-grid-lg-span-5 onyx-grid-xl-span-6`,
          "dynamic element",
        )}
      </main>,
    );
    const element = page.getByText("dynamic element");

    // ASSERT
    await expectActualGridSpan(element, i + 1);
  });
});

test(`default span should apply when no breakpoint span is active`, async ({ mount, page }) => {
  // ARRANGE
  await page.setViewportSize({
    width: ONYX_BREAKPOINTS.md + 1,
    height: 400,
  });
  await mount(
    <main class="onyx-grid onyx-grid-container" style={{ outline: "1px solid red" }}>
      {createGridElement(
        NaN,
        `onyx-grid-span-4 onyx-grid-lg-span-5 onyx-grid-xl-span-6`,
        "dynamic element",
      )}
    </main>,
  );
  const element = page.getByText("dynamic element");

  // ASSERT
  await expectActualGridSpan(element, 4);
});

const MAX_WIDTH_TEST_SETUP = [
  { breakpoint: "lg", className: "onyx-grid-max-md" },
  { breakpoint: "xl", className: "onyx-grid-max-lg" },
] satisfies { breakpoint: OnyxBreakpoint; className: string }[];

MAX_WIDTH_TEST_SETUP.forEach(({ breakpoint, className }) => {
  test(`page content with max width should be left aligned for ${breakpoint}`, async ({
    mount,
    page,
  }) => {
    // ARRANGE
    const VIEWPORT_WIDTH = ONYX_BREAKPOINTS[breakpoint] + 1001;
    await page.setViewportSize({ width: VIEWPORT_WIDTH, height: 400 });

    await mount(
      <main class={`onyx-grid-container ${className}`} style={{ outline: "1px solid red" }}>
        {createGridElement(1)}
      </main>,
    );

    const box = await page.locator("main").evaluate((el) => el.getBoundingClientRect());

    expect(box.left).toBe(0);
    expect(box.right).toBe(ONYX_BREAKPOINTS[breakpoint]);
  });
});

MAX_WIDTH_TEST_SETUP.forEach(({ breakpoint, className }) => {
  test(`page content with max width and centering should be positioned correctly for ${className}`, async ({
    mount,
    page,
  }) => {
    // ARRANGE
    const VIEWPORT_WIDTH = ONYX_BREAKPOINTS[breakpoint] + 1001;
    await page.setViewportSize({ width: VIEWPORT_WIDTH, height: 400 });

    await mount(
      <main
        class={`onyx-grid-container ${className} onyx-grid-center`}
        style={{ outline: "1px solid red" }}
      >
        {createGridElement(1)}
      </main>,
    );

    const box = await page.locator("main").evaluate((el) => el.getBoundingClientRect());

    const BOX_MAX_WIDTH = ONYX_BREAKPOINTS[breakpoint];
    const EXPECTED_LEFT = (VIEWPORT_WIDTH - BOX_MAX_WIDTH) / 2;
    const EXPECTED_RIGHT = EXPECTED_LEFT + BOX_MAX_WIDTH;

    expect(box.left).toBe(EXPECTED_LEFT);
    expect(box.right).toBe(EXPECTED_RIGHT);
  });
});
