/* eslint playwright/expect-expect: ["error", { "assertFunctionNames": ["expectComputedGridSpan", "expectComputedColumnCount"] }] -- We have some assertions in extra functions */
import type { Locator, Page } from "@playwright/test";
import {
  ONYX_BREAKPOINTS,
  ONYX_MAX_WIDTHS,
  type OnyxBreakpoint,
} from "@sit-onyx/shared/breakpoints";
import { expect, test } from "../playwright/a11y";

/**
 * Map of column count per breakpoint.
 */
const GRID_COLUMNS = {
  "2xs": 4,
  xs: 8,
  sm: 8,
  md: 12,
  lg: 12,
  xl: 12,
} satisfies Record<OnyxBreakpoint, number>;

const createGridElement = (
  cols: number | "full",
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

const expectComputedGridSpan = async (element: Locator, toBe: number) => {
  await expect(element).toBeAttached();
  const value = await element.evaluate((e) => window.getComputedStyle(e).gridColumnEnd);
  return expect(value, "must span the given columns").toBe(`span ${toBe}`);
};

const expectComputedColumnCount = async (page: Page, count: number) => {
  const value = await page
    .locator(".onyx-grid")
    .evaluate((grid) => window.getComputedStyle(grid).gridTemplateColumns);
  const columns = value.split(" ");
  return expect(columns, "must have expected column count").toHaveLength(count);
};

const getAllGridElements = async (page: Page) => {
  const allGridElements = await page.locator(".onyx-grid > div").all();
  expect(allGridElements).not.toHaveLength(0);
  return allGridElements;
};

const fullPageScreenshot = (page: Page, name: string) => {
  return expect(page).toHaveScreenshot(name, { fullPage: true });
};

test.beforeEach(({ page }) => page.addStyleTag({ content: "body { margin: 0; }" }));

Object.entries(GRID_COLUMNS).forEach(([name, columns]) => {
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
        {Array.from({ length: 16 }, (_, i) => createGridElement(i + 1))}
        {createGridElement("full")}
      </main>,
    );

    // ASSERT
    await fullPageScreenshot(page, `grid-${name}.png`);
    const allGridElements = await getAllGridElements(page);

    for (let i = 0; i < allGridElements.length; i++) {
      const element = allGridElements[i];
      await expectComputedGridSpan(element, Math.min(i + 1, columns));
      await expectComputedColumnCount(page, columns);
    }
  });
});

const XL_VARIANTS = [
  { className: "", breakpoint: "xl", expectedColumns: 12 },
  { className: "onyx-grid-lg-16", breakpoint: "lg", expectedColumns: 16 },
  { className: "onyx-grid-lg-16", breakpoint: "xl", expectedColumns: 16 },
  { className: "onyx-grid-xl-20", breakpoint: "lg", expectedColumns: 16 },
  { className: "onyx-grid-xl-20", breakpoint: "xl", expectedColumns: 20 },
] as const;

XL_VARIANTS.forEach(({ className, expectedColumns, breakpoint }) => {
  test(`xl grid variant ${className} with breakpoint ${breakpoint} should have ${expectedColumns} columns`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: ONYX_BREAKPOINTS[breakpoint] + 1, height: 400 });

    await mount(
      <main
        class={`onyx-grid onyx-grid-container ${className}`}
        style={{ outline: "1px solid red" }}
      >
        {createGridElement(20)}
        {createGridElement("full")}
      </main>,
    );

    await expectComputedColumnCount(page, expectedColumns);
    await expectComputedGridSpan(page.locator(".onyx-grid-span-full"), expectedColumns);
    await fullPageScreenshot(page, `grid-${breakpoint}-variant-${className}.png`);
  });
});

Object.entries(GRID_COLUMNS).forEach(([name, columns]) => {
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
        {Array.from({ length: 16 }, (_, i) => createGridElement(i + 1))}
      </main>,
    );

    // ASSERT
    const allGridElements = await getAllGridElements(page);
    for (let i = 0; i < allGridElements.length; i++) {
      const element = allGridElements[i];
      await expectComputedGridSpan(element, Math.min(i + 1, columns, GRID_COLUMNS.md));
    }
  });
});

Object.entries(GRID_COLUMNS).forEach(([name, columns]) => {
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
        {Array.from({ length: 16 }, (_, i) => createGridElement(i + 1))}
      </main>,
    );

    // ASSERT
    const allGridElements = await getAllGridElements(page);
    for (let i = 0; i < allGridElements.length; i++) {
      const element = allGridElements[i];
      await expectComputedGridSpan(element, Math.min(i + 1, columns, GRID_COLUMNS.lg));
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
    await expectComputedGridSpan(element, i + 1);
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
  await expectComputedGridSpan(element, 4);
});

Object.entries(ONYX_MAX_WIDTHS).forEach(([breakpoint, size]) => {
  test(`page content with max width should be left aligned for ${breakpoint}`, async ({
    mount,
    page,
  }) => {
    // ARRANGE
    const className = `onyx-grid-max-${breakpoint}`;
    await page.setViewportSize({ width: ONYX_BREAKPOINTS.xl, height: 400 });

    await mount(
      <main class={`onyx-grid-container ${className}`} style={{ outline: "1px solid red" }}>
        {createGridElement(1)}
      </main>,
    );

    const box = await page.locator("main").evaluate((el) => el.getBoundingClientRect());

    expect(box.left).toBe(0);
    expect(box.right).toBe(size);
  });
});

Object.entries(ONYX_MAX_WIDTHS).forEach(([breakpoint, size]) => {
  const className = `onyx-grid-max-${breakpoint}`;
  test(`page content with max width and centering should be positioned correctly for ${className}`, async ({
    mount,
    page,
  }) => {
    // ARRANGE
    const VIEWPORT_WIDTH = ONYX_BREAKPOINTS.xl;
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

    const EXPECTED_LEFT = (VIEWPORT_WIDTH - size) / 2;
    const EXPECTED_RIGHT = EXPECTED_LEFT + size;

    expect(box.left).toBe(EXPECTED_LEFT);
    expect(box.right).toBe(EXPECTED_RIGHT);
  });
});
