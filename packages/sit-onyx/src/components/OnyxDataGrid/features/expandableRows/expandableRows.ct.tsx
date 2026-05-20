import { expect, test } from "../../../../playwright/a11y.js";
import TestCase from "./TestCase.ct.vue";

test("should expand rows", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <TestCase
      columns={[
        { key: "a", label: "A" },
        { key: "b", label: "B" },
        { key: "c", label: "C" },
      ]}
      data={[
        { id: 1, a: "A1", b: "B1", c: "C1" },
        { id: 2, a: "A2", b: "B2", c: "C2" },
        { id: 3, a: "A3", b: "B3", c: "C3" },
      ]}
    />,
  );

  const expectRowCount = (count: number) => {
    // +1 due to header row
    return expect(component.getByRole("row")).toHaveCount(count + 1);
  };

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");
  await expectRowCount(3);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ACT
  const firstRow = component.getByRole("row").nth(1);
  const toggleButton = firstRow.getByRole("button", { name: "Click to toggle content" });
  await toggleButton.click();

  // ASSERT
  await expectRowCount(4);
  const detailsRow = component.getByRole("row").nth(2);
  await expect(detailsRow).toContainText("A1");

  // ACT
  await detailsRow.hover();

  // ASSERT
  await expect(component).toHaveScreenshot("expanded.png");

  // ACT
  await toggleButton.click();

  // ASSERT
  await expectRowCount(3);
});
