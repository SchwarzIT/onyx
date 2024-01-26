/* eslint-disable playwright/expect-expect */
import { expect, test } from "../playwright-axe";
import type { Locator } from "@playwright/test";

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
  const jsValue = await element.evaluateHandle(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e) => window.getComputedStyle(e)["grid-column-end" as any],
  );
  const value = await jsValue.jsonValue();
  return expect(value).toBe(`span ${toBe}`);
};

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
