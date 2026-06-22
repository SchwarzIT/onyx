import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxModal from "../OnyxModal/OnyxModal.vue";
import OnyxDataGrid from "./OnyxDataGrid.vue";
import TestWrapperCt from "./TestWrapper.ct.vue";
import TestWrapperColumnTypeOptionsCt from "./TestWrapperColumnTypeOptions.ct.vue";
import TestWrapperWithColumnTypesCt from "./TestWrapperWithColumnTypes.ct.vue";

test("OnyxDataGrid", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<TestWrapperCt />);

  await test.step("should display header labels as expected", async () => {
    // ASSERT
    const headers = component.locator("th");
    await expect(headers).toHaveCount(3);
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
    columns: ["empty", "filled", "skeleton", "ellipsis"],
    rows: ["default", "columnGroups"],
    component: (column, row) => {
      return (
        <TestWrapperWithColumnTypesCt
          empty={column === "empty"}
          columnGroups={row === "columnGroups"}
          skeleton={column === "skeleton"}
          ellipsis={column === "ellipsis"}
        />
      );
    },
  });
});

test("should not resize in a loop when empty and used in a modal without explicit width", async ({
  mount,
  page,
}) => {
  // ARRANGE
  await mount(
    <OnyxModal label="Example label" open>
      <OnyxDataGrid data={[]} columns={["A", "B"]}>
        <template v-slot:head>
          <tr>
            <th>Column A</th>
            <th>Column B</th>
          </tr>
        </template>
      </OnyxDataGrid>
    </OnyxModal>,
  );

  const modal = page.getByRole("dialog", { name: "Example label" });

  // ASSERT
  await expect(modal).toBeVisible();

  // ACT
  const box1 = (await modal.boundingBox())!;

  const handle = await modal.elementHandle();
  await handle!.waitForElementState("stable");

  const box2 = (await modal.boundingBox())!;

  // ASSERT
  expect(box1.width).toBe(box2.width);
});
