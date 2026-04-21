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
const columns = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];

const columnsWithGroups = columns.map((column, index) => ({
  key: column,
  label: column,
  columnGroupKey: index < 2 ? "group1" : "group2",
}));

test.use({
  viewport: { width: 400, height: 1000 },
});

test("sticky Column should stay in View", async ({ mount }) => {
  // ARRANGE
  const data = getTestData();
  const component = await mount(
    <TestCase data={data} columns={columns} stickyColumnsOptions={{ columns: ["a"] }} />,
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
  test(`should stick on ${position}`, async ({ mount }) => {
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

test("multiple stickyColumns", async ({ mount }) => {
  const data = getTestData();

  const component = await mount(
    <TestCase data={data} columns={columns} stickyColumnsOptions={{ columns: ["a", "b"] }} />,
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

  const component = await mount(
    <div>
      <TestCase data={getTestData()} columns={columns} stickyColumnsOptions={{ columns: ["a"] }} />,
      {"Hello World ".repeat(256)}
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

positions.forEach((position) => {
  test(`sticky columns with column groups (${position})`, async ({ mount }) => {
    const data = getTestData();

    const component = await mount(
      <TestCase
        data={data}
        columns={columnsWithGroups}
        stickyColumnsOptions={{ columns: position === "left" ? ["a"] : ["k"], position }}
      />,
    );

    // ACT
    await component
      .getByRole("columnheader", { name: position === "left" ? "k" : "a" })
      .scrollIntoViewIfNeeded();
    // ASSERT
    const stickyColumn = component.getByRole("columnheader", {
      name: position === "left" ? "a" : "k",
    });
    const stickyGroup =
      // eslint-disable-next-line playwright/no-conditional-in-test -- simple test case
      position === "left"
        ? component.getByRole("columnheader", { name: "group1" }).first()
        : component.getByRole("columnheader", { name: "group2" }).last();

    await expect(stickyColumn).toContainClass(position);
    await expect(stickyColumn).toHaveCSS(position, /\d+px/);
    await expect(stickyGroup).toContainClass(position);
    await expect(stickyGroup).toHaveCSS(position, /\d+px/);

    await expect(component).toHaveScreenshot(`data-grid-sticky-columnsGroups-${position}.png`);
  });
});

test("should allow per-column positioning (left and right simultaneously)", async ({ mount }) => {
  const data = getTestData();

  const component = await mount(
    <TestCase
      data={data}
      columns={columns}
      stickyColumnsOptions={{
        columns: [
          { key: "a", position: "left" },
          { key: "b", position: "left" },
          { key: "j", position: "right" },
          { key: "k", position: "right" },
        ],
      }}
    />,
  );

  // ACT
  await component.getByRole("columnheader", { name: "f" }).scrollIntoViewIfNeeded();

  // ASSERT
  const stickyColA = component.getByRole("columnheader", { name: "a" });
  const stickyColB = component.getByRole("columnheader", { name: "b" });

  await expect(stickyColA).toContainClass("onyx-data-grid-sticky-columns--sticky");
  await expect(stickyColA).toContainClass("left");
  await expect(stickyColA).toHaveCSS("left", /[0-9]+px/);

  await expect(stickyColB).toContainClass("onyx-data-grid-sticky-columns--sticky");
  await expect(stickyColB).toContainClass("left");
  await expect(stickyColB).toHaveCSS("left", /[0-9]+px/);

  const stickyColJ = component.getByRole("columnheader", { name: "j" });
  const stickyColK = component.getByRole("columnheader", { name: "k" });

  await expect(stickyColJ).toContainClass("onyx-data-grid-sticky-columns--sticky");
  await expect(stickyColJ).toContainClass("right");
  await expect(stickyColJ).toHaveCSS("right", /[0-9]+px/);

  await expect(stickyColK).toContainClass("onyx-data-grid-sticky-columns--sticky");
  await expect(stickyColK).toContainClass("right");
  await expect(stickyColK).toHaveCSS("right", /[0-9]+px/);
});

test("selection column is automatically sticky when both features are active", async ({
  mount,
}) => {
  const data = getTestData();

  const component = await mount(
    <TestCase
      data={data}
      columns={columns}
      stickyColumnsOptions={{ columns: ["a"] }}
      withSelection={true}
    />,
  );

  await component.getByRole("columnheader", { name: "k" }).scrollIntoViewIfNeeded();

  // ASSERT
  const selectionColumn = component.locator("th.onyx-data-grid-selection-cell");
  const stickyColA = component.getByRole("columnheader", { name: "a", exact: true });

  await expect(selectionColumn).toContainClass("onyx-data-grid-sticky-columns--sticky");
  await expect(selectionColumn).toContainClass("left");
  await expect(selectionColumn).toHaveCSS("left", "0px");

  await expect(stickyColA).toContainClass("onyx-data-grid-sticky-columns--sticky");
  await expect(stickyColA).toContainClass("left");
  await expect(stickyColA).toHaveCSS("left", /[0-9]*px/);

  await expect(component).toHaveScreenshot("data-grid-sticky-selection-column.png");
});
