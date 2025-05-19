import { expect, test } from "../../../../playwright/a11y";
import TestCase from "./TestCase.vue";

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

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 400, height: 1000 });
});

test("sticky Column should stay in View", async ({ mount }) => {
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
  await expect(notStickyColumn).not.toHaveClass(/onyx-data-grid-sticky-columns--sticky/);
  await expect(notStickyColumn).not.toHaveCSS("position", "sticky");

  await expect(stickyColumn).toHaveClass(/onyx-data-grid-sticky-columns--sticky/);
  await expect(stickyColumn).toHaveCSS("position", "sticky");
  await expect(stickyColumn).toBeVisible();

  await expect(component).toHaveScreenshot("data-grid-one-sticky-column.png");
});

const positions = ["left", "right"] as const;

positions.forEach((position) => {
  test(`should stick on ${position}`, async ({ mount }) => {
    // ARRANGE
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
    await expect(stickyColumn).toHaveClass(new RegExp(position));
    await expect(stickyColumn).toHaveCSS(position, /\d+px/);
    await expect(component).toHaveScreenshot(`data-grid-sticky-columns-${position}.png`);
  });
});

test("multiple stickyColumns", async ({ mount }) => {
  // ARRANGE
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
  await expect(fistStickyColumn).toHaveClass(/onyx-data-grid-sticky-columns--sticky/);
  await expect(fistStickyColumn).toHaveCSS("left", /\d+px/);
  await expect(secondStickyColumn).toHaveClass(/onyx-data-grid-sticky-columns--sticky/);
  await expect(secondStickyColumn).toHaveCSS("left", /\d+px/);
  await expect(component).toHaveScreenshot("data-grid-two-sticky-columns.png");
});
