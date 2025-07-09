import type { Locator } from "@playwright/test";
import { expect, test } from "../../../../playwright/a11y.js";
import { dragResizeHandle } from "../../../../playwright/index.js";
import TestCase from "./TestCase.vue";

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

  // ASSERT
  let box = (await aColumn.boundingBox())!;
  expect(box.width).toBe(200);
  await expectColumnCount(component, 3, "should show all 3 columns without empty column");

  // ACT
  await dragResizeHandle({ page, component: aColumn, to: 100 });
  box = (await aColumn.boundingBox())!;

  // ASSERT
  expect(box.width).toBe(99);
  await expectColumnCount(component, 4, "should show empty column when resizing smaller");
  await expect(component).toHaveScreenshot("data-grid-resized-columns-with-extra-empty-column.png");

  const bBox = (await bColumn.boundingBox())!;
  const cBox = (await cColumn.boundingBox())!;
  expect(bBox.width, "should keep width of other columns when resizing").toBe(100);
  expect(cBox.width, "should keep width of other columns when resizing").toBe(300);
});
