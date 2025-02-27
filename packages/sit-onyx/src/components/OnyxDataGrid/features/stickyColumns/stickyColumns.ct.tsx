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
  await expect(notStickyColumn).not.toHaveClass(/sticky/);
  await expect(notStickyColumn).not.toHaveCSS("position", "sticky");

  await expect(stickyColumn).toHaveClass(/sticky/);
  await expect(stickyColumn).toHaveCSS("position", "sticky");
  await expect(stickyColumn).toBeVisible();

  await expect(component).toHaveScreenshot("data-grid-one-sticky-column.png");
});

test("should stick left/right", async ({ page, mount }) => {
  await page.setViewportSize({ width: 400, height: 1000 });
  const data = getTestData();
  const directions = ["left", "right"] as const;

  for (const direction of directions) {
    const component = await mount(
      <TestCase
        data={data}
        columns={["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]}
        stickyColumnsOptions={{ columns: direction === "left" ? ["a"] : ["k"], direction }}
      />,
    );

    // ACT
    await component
      .getByRole("columnheader", { name: direction === "left" ? "a" : "k" })
      .scrollIntoViewIfNeeded();
    // ASSERT
    const stickyColumn = component.getByRole("columnheader", {
      name: direction === "left" ? "a" : "k",
    });
    await expect(stickyColumn).toHaveClass(`sticky ${direction}`);
    await expect(stickyColumn).toHaveCSS(direction, /[0-9]+px/);
    await expect(component).toHaveScreenshot(`data-grid-sticky-columns-${direction}.png`);
  }
});
test("multible stickyColumns", async ({ page, mount }) => {
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
  await expect(fistStickyColumn).toHaveClass(/stick/);
  await expect(fistStickyColumn).toHaveCSS("left", /[0-9]+px/);
  await expect(secondStickyColumn).toHaveClass(/stick/);
  await expect(secondStickyColumn).toHaveCSS("left", /[0-9]+px/);
  await expect(component).toHaveScreenshot("data-grid-two-sticky-columns.png");
});
