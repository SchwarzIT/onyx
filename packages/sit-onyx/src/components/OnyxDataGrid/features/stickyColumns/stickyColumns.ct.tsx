import { expect, test } from "../../../../playwright/a11y.js";
import TestCase from "./TestCase.ct.vue";

const getTestData = () => [
  { id: 1, a: "1", b: "a", c: "C", d: "D", e: "E", f: "F", g: "G", h: "H", i: "I", j: "J", k: "K" },
  { id: 2, a: "1", b: "A", c: "C", d: "D", e: "E", f: "F", g: "G", h: "H", i: "I", j: "J", k: "K" },
  { id: 3, a: "1", b: "B", c: "C", d: "D", e: "E", f: "F", g: "G", h: "H", i: "I", j: "J", k: "K" },
  { id: 4, a: "2", b: "A", c: "C", d: "D", e: "E", f: "F", g: "G", h: "H", i: "I", j: "J", k: "K" },
  {
    id: 5,
    a: "2",
    b: "ab",
    c: "C",
    d: "D",
    e: "E",
    f: "F",
    g: "G",
    h: "H",
    i: "I",
    j: "J",
    k: "K",
  },
];

test("sticky Column should stay in View", async ({ page, mount }) => {
  await page.setViewportSize({ width: 400, height: 1000 });
  // ARRANGE
  const data = getTestData();
  const component = await mount(
    <TestCase
      data={data}
      columns={["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]}
      stickyColumnsOptions={{ columns: ["a"] }}
    />,
  );

  // ACT
  await component.getByRole("columnheader", { name: "k" }).scrollIntoViewIfNeeded();

  // ASSERT
  const stickyColumn = component.getByRole("columnheader", { name: "a" });
  const notStickyColumn = component.getByRole("columnheader", { name: "b" });
  await expect(notStickyColumn).not.toContainClass("onyx-data-grid-sticky-columns--sticky");
  await expect(notStickyColumn).not.toHaveCSS("position", "sticky");

  await expect(stickyColumn).toContainClass("onyx-data-grid-sticky-columns--sticky");
  await expect(stickyColumn).toHaveCSS("position", "sticky");
  await expect(stickyColumn).toBeVisible();

  await expect(component).toHaveScreenshot("data-grid-one-sticky-column.png");
});
const positions = ["left", "right"] as const;

positions.forEach((position) => {
  test(`should stick on ${position}`, async ({ page, mount }) => {
    await page.setViewportSize({ width: 400, height: 1000 });
    const data = getTestData();

    const component = await mount(
      <TestCase
        data={data}
        columns={["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]}
        stickyColumnsOptions={{ columns: position === "left" ? ["a"] : ["k"], position }}
      />,
    );

    // ACT
    await component
      .getByRole("columnheader", { name: position === "left" ? "a" : "k" })
      .scrollIntoViewIfNeeded();
    // ASSERT
    const stickyColumn = component.getByRole("columnheader", {
      name: position === "left" ? "a" : "k",
    });
    await expect(stickyColumn).toContainClass(position);
    await expect(stickyColumn).toHaveCSS(position, /[0-9]+px/);
    await expect(component).toHaveScreenshot(`data-grid-sticky-columns-${position}.png`);
  });
});
test("multiple stickyColumns", async ({ page, mount }) => {
  await page.setViewportSize({ width: 400, height: 1000 });
  const data = getTestData();

  const component = await mount(
    <TestCase
      data={data}
      columns={["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]}
      stickyColumnsOptions={{ columns: ["a", "b"] }}
    />,
  );

  // ACT
  await component.getByRole("columnheader", { name: "k" }).scrollIntoViewIfNeeded();

  // ASSERT
  const fistStickyColumn = component.getByRole("columnheader", { name: "a" });
  const secondStickyColumn = component.getByRole("columnheader", { name: "b" });
  await expect(fistStickyColumn).toContainClass("onyx-data-grid-sticky-columns--sticky");
  await expect(fistStickyColumn).toHaveCSS("left", /[0-9]+px/);
  await expect(secondStickyColumn).toContainClass("onyx-data-grid-sticky-columns--sticky");
  await expect(secondStickyColumn).toHaveCSS("left", /[0-9]+px/);
  await expect(component).toHaveScreenshot("data-grid-two-sticky-columns.png");
});

test("should allow scrolling the page", async ({ page, mount }) => {
  // issue: https://github.com/SchwarzIT/onyx/issues/3637
  // ARRANGE
  await page.setViewportSize({ width: 400, height: 1000 });

  const component = await mount(
    <div>
      <TestCase
        data={getTestData()}
        columns={["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]}
        stickyColumnsOptions={{ columns: ["a"] }}
      />
      ,{"Hello World ".repeat(256)}
    </div>,
  );

  const table = component.getByRole("table");

  // ASSERT
  await expect(table).toBeInViewport();

  // ACT
  const box = (await table.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.wheel(0, 512);

  // ASSERT
  await expect(table, "should scroll page when mouse is over the table").not.toBeInViewport();
});
