import type { Locator } from "@playwright/test";
import { expect, test } from "../../../../playwright/a11y.js";
import { dragResizeHandle } from "../../../../playwright/index.js";
import type { DataGridEntry } from "../../types.js";
import TestCase from "./TestCase.ct.vue";

const getTestData = () => [
  { id: 1, a: "1", b: "a", c: "aa" },
  { id: 2, a: "2", b: "B", c: "bb" },
  { id: 3, a: "3", b: "C", c: "cc" },
];

const expectColumnCount = async (dataGrid: Locator, count: number, message?: string) => {
  await expect(dataGrid.getByRole("columnheader"), message).toHaveCount(count);
};

test.beforeEach(async ({ page }) => {
  await page.addStyleTag({
    content: `body { margin: 0; }`,
  });
});

test("should resize columns", async ({ page, mount }) => {
  // ARRANGE
  let resizeState: Record<keyof DataGridEntry, string> = {};

  const data = getTestData();
  const component = await mount(
    <TestCase
      data={data}
      columns={[
        { key: "a", width: "200px" },
        { key: "b", width: "100px" },
        { key: "c", width: "300px" },
      ]}
      onUpdate:resizeState={(newValue) => (resizeState = newValue)}
    />,
  );

  const aColumn = component.getByRole("columnheader", { name: "Drag to change width a" });
  const bColumn = component.getByRole("columnheader", { name: "Drag to change width b" });
  const cColumn = component.getByRole("columnheader", { name: "Drag to change width c" });
  const resizeHandles = component
    .getByRole("columnheader", { name: "Drag to change width" })
    .getByRole("button");

  // ASSERT
  let box = (await aColumn.boundingBox())!;
  expect(box.width).toBeCloseTo(200);
  await expectColumnCount(component, 3, "should show all 3 columns without empty column");
  await expect(resizeHandles, "should not render a resize handle for the last column").toHaveCount(
    3,
  );
  expect(resizeState).toStrictEqual({});

  // ACT
  await dragResizeHandle({ page, component: aColumn, to: 100 });
  box = (await aColumn.boundingBox())!;

  // ASSERT
  expect(box.width).toBeCloseTo(100, -1);
  expect(parseFloat(resizeState["a"] ?? "")).toBeCloseTo(100, -1);
  await expect(component).toHaveScreenshot("data-grid-resized-columns-with-extra-empty-column.png");

  const bBox = (await bColumn.boundingBox())!;
  let cBox = (await cColumn.boundingBox())!;
  expect(bBox.width, "should keep width of other columns when resizing").toBeCloseTo(100);
  expect(cBox.width, "should keep width of other columns when resizing").toBeCloseTo(300);

  // ACT
  await dragResizeHandle({ page, component: cColumn, to: 1200 });

  // ASSERT
  cBox = (await cColumn.boundingBox())!;
  expect(cBox.width, "should be able to resize outside of viewport").toBeCloseTo(1000);
  expect(parseFloat(resizeState["c"] ?? "")).toBeCloseTo(1000, -1);

  // ACT
  await cColumn.getByRole("button", { name: "Drag to change width" }).dblclick();

  // ASSERT
  cBox = (await cColumn.boundingBox())!;
  expect(cBox.width, "should be able to resize on doubleclick").toBeCloseTo(50, -1);
  expect(resizeState["c"]).toBe("max-content");
});

test("should consider initial resize state", async ({ page, mount }) => {
  // ARRANGE
  let resizeState: Record<keyof DataGridEntry, string> = {};

  const data = getTestData();
  const component = await mount(
    <TestCase
      data={data}
      columns={[
        { key: "a", width: "200px" },
        { key: "b", width: "100px" },
        { key: "c", width: "300px" },
      ]}
      resizeState={{ a: "300px", b: "200px", c: "100px" }}
      onUpdate:resizeState={(newValue) => (resizeState = newValue)}
    />,
  );

  const aColumn = component.getByRole("columnheader", { name: "Drag to change width a" });
  const bColumn = component.getByRole("columnheader", { name: "Drag to change width b" });
  const cColumn = component.getByRole("columnheader", { name: "Drag to change width c" });

  // ASSERT
  let aBox = (await aColumn.boundingBox())!;
  const bBox = (await bColumn.boundingBox())!;
  const cBox = (await cColumn.boundingBox())!;
  expect(aBox.width).toBeCloseTo(300);
  expect(bBox.width).toBeCloseTo(200);
  expect(cBox.width).toBeCloseTo(100);
  expect(resizeState).toStrictEqual({});

  // ACT
  await dragResizeHandle({ page, component: aColumn, to: 100 });

  // ASSERT
  aBox = (await aColumn.boundingBox())!;
  expect(aBox.width).toBeCloseTo(100, -1);
  expect(parseFloat(resizeState["a"] ?? "")).toBeCloseTo(100, -1);
});
