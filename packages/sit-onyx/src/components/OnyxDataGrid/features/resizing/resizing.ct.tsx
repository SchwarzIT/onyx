import type { Locator } from "@playwright/test";
import { expect, test } from "../../../../playwright/a11y";
import TestCase from "./TestCase.vue";

const getTestData = () => [
  { id: 1, a: "1", b: "a", c: "aa" },
  { id: 2, a: "2", b: "B", c: "bb" },
  { id: 3, a: "3", b: "C", c: "cc" },
];

const expectColumnCount = async (dataGrid: Locator, count: number) => {
  await expect(dataGrid.getByRole("columnheader")).toHaveCount(count);
};

test("should resize columns", async ({ mount }) => {
  // ARRANGE
  const data = getTestData();
  const component = await mount(<TestCase data={data} columns={["a", "b", "c"]} />);

  const firstColumn = await component.getByRole("columnheader", { name: "a" }).boundingBox();
  const resizeHandle = component.getByRole("columnheader", { name: "a" }).getByRole("button");

  await expectColumnCount(component, 3); // 3 Visible

  await resizeHandle.dragTo(resizeHandle, {
    // eslint-disable-next-line playwright/no-force-option -- it's required for the test
    force: true,
    targetPosition: {
      x: firstColumn!.width * -0.4,
      y: 0,
    },
  });

  const resizedColumn = await component.getByRole("columnheader", { name: "a" }).boundingBox();
  const emptyColumn = component.getByRole("columnheader").filter({ hasText: /^$/ });

  // ACT
  expect(resizedColumn!.width).toBeLessThan(firstColumn!.width);
  await expect(emptyColumn).toBeVisible();
  await expectColumnCount(component, 4); // 4 Visible

  await expect(component).toHaveScreenshot("data-grid-resized-columns-with-extra-empty-column.png");
});
