/* eslint-disable playwright/expect-expect */
import type { Locator, Page } from "@playwright/test";
import { expect, test } from "../playwright/a11y";

const GRIDS = {
  "2xs": { breakpoint: 321, columns: 4 },
  xs: { breakpoint: 577, columns: 8 },
  sm: { breakpoint: 769, columns: 8 },
  md: { breakpoint: 993, columns: 12 },
  lg: { breakpoint: 1441, columns: 16 },
  xl: { breakpoint: 1921, columns: 16 },
};

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

Object.entries(GRIDS).forEach(([name, { breakpoint, columns }], i) => {
  test(`all 'onyx-grid-span-*' should have correct column count for ${name} breakpoint`, async ({
    mount,
    page,
  }) => {
    // ARRANGE
    await page.setViewportSize({ width: breakpoint, height: 400 });
    await mount(
      <main class="onyx-grid" style={{ outline: "1px solid red" }}>
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

Object.entries(GRIDS).forEach(([name, { breakpoint, columns }], i) => {
  test(`all 'onyx-grid-span-*' should have correct column count for ${name} breakpoint in max grid md`, async ({
    mount,
    page,
  }) => {
    // ARRANGE
    await page.setViewportSize({ width: breakpoint, height: 400 });
    await mount(
      <main class="onyx-grid onyx-grid-max-md" style={{ outline: "1px solid red" }}>
        {new Array(16).fill(null).map((_, i) => createGridElement(i + 1))}
      </main>,
    );

    // ASSERT
    for (const loc of await page.locator("onyx-grid > div").all()) {
      await expectActualGridSpan(loc, Math.min(i, columns, GRIDS.md.columns));
    }
  });
});

Object.entries(GRIDS).forEach(([name, { breakpoint, columns }], i) => {
  test(`all 'onyx-grid-span-*' should have correct column count for ${name} breakpoint in max grid lg`, async ({
    mount,
    page,
  }) => {
    // ARRANGE
    await page.setViewportSize({ width: breakpoint, height: 400 });
    await mount(
      <main class="onyx-grid onyx-grid-max-lg" style={{ outline: "1px solid red" }}>
        {new Array(16).fill(null).map((_, i) => createGridElement(i + 1))}
      </main>,
    );

    // ASSERT
    for (const loc of await page.locator("onyx-grid > div").all()) {
      await expectActualGridSpan(loc, Math.min(i, columns, GRIDS.lg.columns));
    }
  });
});

Object.entries(GRIDS).forEach(([name, { breakpoint }], i) => {
  test(`"${name}" breakpoint span should overwrite smaller breakpoint span`, async ({
    mount,
    page,
  }) => {
    // ARRANGE
    await page.setViewportSize({
      width: breakpoint,
      height: 400,
    });
    await mount(
      <main class="onyx-grid" style={{ outline: "1px solid red" }}>
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
    width: GRIDS.md.breakpoint,
    height: 400,
  });
  await mount(
    <main class="onyx-grid" style={{ outline: "1px solid red" }}>
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
  {
    breakpoint: "lg" as keyof typeof GRIDS,
    className: "onyx-grid-max-md",
  },
  {
    breakpoint: "xl" as keyof typeof GRIDS,
    className: "onyx-grid-max-lg",
  },
];

MAX_WIDTH_TEST_SETUP.forEach(({ breakpoint, className }) => {
  test(`grid with optional max width should be left aligned for ${breakpoint}`, async ({
    mount,
    page,
  }) => {
    // ARRANGE
    const VIEWPORT_WIDTH = GRIDS[breakpoint].breakpoint + 1000;
    await page.setViewportSize({
      width: VIEWPORT_WIDTH,
      height: 400,
    });
    await mount(
      <main class={`onyx-grid ${className}`} style={{ outline: "1px solid red" }}>
        {createGridElement(1)}
      </main>,
    );
    const element = page.locator("main");
    const box = await element
      .evaluateHandle((el) => el.getBoundingClientRect())
      .then((res) => res.jsonValue());

    const EXPECTED_LEFT = 0;
    expect(box.left).toBe(EXPECTED_LEFT);
    const BREAKPOINT_MAX = GRIDS[breakpoint].breakpoint - 1;
    // We need to add the margin as it is implemented via a padding which isn't included in the boundingclientrect
    const MARGIN = 64;
    const EXPECTED_RIGHT = 2 * MARGIN + BREAKPOINT_MAX;
    expect(box.right).toBe(EXPECTED_RIGHT);
  });
});

MAX_WIDTH_TEST_SETUP.forEach(({ breakpoint, className }) => {
  test(`grid with optional max width and centering should be positioned correctly for ${className}`, async ({
    mount,
    page,
  }) => {
    // ARRANGE
    const VIEWPORT_WIDTH = GRIDS[breakpoint].breakpoint + 1000;
    await page.setViewportSize({
      width: VIEWPORT_WIDTH,
      height: 400,
    });
    await mount(
      <main class={`onyx-grid ${className} onyx-grid-center`} style={{ outline: "1px solid red" }}>
        {createGridElement(1)}
      </main>,
    );
    const element = page.locator("main");
    const box = await element
      .evaluateHandle((el) => el.getBoundingClientRect())
      .then((res) => res.jsonValue());

    // We need to add the margin as it is implemented via a padding which isn't included in the boundingclientrect
    const MARGIN = 64;
    const BOX_MAX_WIDTH = GRIDS[breakpoint].breakpoint - 1 + 2 * MARGIN;
    const EXPECTED_LEFT = (VIEWPORT_WIDTH - BOX_MAX_WIDTH) / 2;
    expect(box.left).toBe(EXPECTED_LEFT);
    const EXPECTED_RIGHT = EXPECTED_LEFT + BOX_MAX_WIDTH;
    expect(box.right).toBe(EXPECTED_RIGHT);
  });
});
