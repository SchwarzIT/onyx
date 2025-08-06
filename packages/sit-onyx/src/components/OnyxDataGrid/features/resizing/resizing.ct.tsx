import type { Locator } from "@playwright/test";
import { expect, test } from "../../../../playwright/a11y.js";
import { dragResizeHandle } from "../../../../playwright/index.js";
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
  page.setViewportSize({ width: 1280, height: 768 });
  // ARRANGE
  const data = getTestData();
  const component = await mount(
    <TestCase
      data={data}
      columns={[
        { key: "a", width: "200px" },
        { key: "b", width: "100px" },
        { key: "c", width: "300px" },
      ]}
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

  // ACT
  await dragResizeHandle({ page, component: aColumn, to: 100 });
  box = (await aColumn.boundingBox())!;

  // ASSERT
  expect(box.width).toBeCloseTo(100, -1);
  await expect(component).toHaveScreenshot("data-grid-resized-columns-with-extra-empty-column.png");

  const bBox = (await bColumn.boundingBox())!;
  let cBox = (await cColumn.boundingBox())!;
  expect(bBox.width, "should keep width of other columns when resizing").toBeCloseTo(100);
  expect(cBox.width, "should keep width of other columns when resizing").toBeCloseTo(300);

  // ACT
  await dragResizeHandle({ page, component: cColumn, to: 1480 });

  // ASSERT
  cBox = (await cColumn.boundingBox())!;
  expect(cBox.width, "should be able to resize outside of viewport").toBeCloseTo(1280);

  // ACT
  await cColumn.getByRole("button", { name: "Drag to change width" }).dblclick();

  // ASSERT
  cBox = (await cColumn.boundingBox())!;
  expect(cBox.width, "should be able to resize on doubleclick").toBeCloseTo(50, -1);
});
