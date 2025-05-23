import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import TestWrapperCt from "./TestWrapper.ct.vue";
import TestWrapperColumnTypeOptionsCt from "./TestWrapperColumnTypeOptions.ct.vue";
import TestWrapperWithColumnTypesCt from "./TestWrapperWithColumnTypes.ct.vue";

test("OnyxDataGrid", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<TestWrapperCt />);

  await test.step("should display header labels as expected", async () => {
    // ASSERT
    const headers = await component.locator("th").all();
    expect(headers).toHaveLength(3);
    await expect(component).toHaveScreenshot("data-grid-with-header-labels.png");
  });

  await test.step("should support header actions", async () => {
    // ARRANGE
    const moreActionsBtn = component.getByLabel("Toggle column actions").last();
    const flyout = component.getByLabel('Choose an action for the column "Day of Birth"');

    // ACT
    await moreActionsBtn.click();

    // ASSERT
    await expect(flyout).toBeVisible();
    await expect(component).toHaveScreenshot("with-header-interactions.png");
  });
});

test("OnyxDataGrid custom type renderer options", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<TestWrapperColumnTypeOptionsCt />);

  // ASSERT
  await expect(component.getByRole("cell").nth(0)).toHaveText("01/01/1990, 01:00:00 AM GMT+1");
  await expect(component.getByRole("cell").nth(1)).toHaveText("Monday, January 1, 1990");
  await expect(component.getByRole("cell").nth(2)).toHaveText("---");
  await expect(component.getByRole("cell").nth(3)).toHaveText("12.34");
  await expect(component.getByRole("cell").nth(4)).toHaveText("+€1.234E1");
  await expect(component.getByRole("cell").nth(5)).toHaveText("NaN");
});

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: `OnyxDataGrid`,
    columns: ["empty", "filled", "skeleton"],
    rows: ["default", "columnGroups"],
    component: (column, row) => {
      return (
        <TestWrapperWithColumnTypesCt
          empty={column === "empty"}
          columnGroups={row === "columnGroups"}
          skeleton={column === "skeleton"}
        />
      );
    },
  });
});
