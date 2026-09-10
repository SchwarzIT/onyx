import { expect, test } from "../../../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../../../playwright/screenshots.js";
import OnyxMillerItem from "../OnyxMillerItem/OnyxMillerItem.vue";
import OnyxMillerPane from "./OnyxMillerPane.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "MillerPane",
    columns: ["default", "compact", "cozy"],
    rows: ["default", "with-items", "long-label"],
    component: (column, row) => (
      <div style={{ height: "300px", width: "250px" }}>
        <OnyxMillerPane
          label={
            row === "long-label" ? "Very Long Category Title For Testing Overflow" : "Categories"
          }
          density={column}
        >
          {row === "with-items"
            ? [
                <OnyxMillerItem label="Item 1" active arrow={true} key="1" />,
                <OnyxMillerItem label="Item 2" count={12} key="2" />,
                <OnyxMillerItem label="Item 3" dot key="3" />,
              ]
            : undefined}
        </OnyxMillerPane>
      </div>
    ),
  });
});

test("should render label and slot items correctly", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxMillerPane label="Fruit Section">
      <OnyxMillerItem label="Apples" />
      <OnyxMillerItem label="Bananas" />
    </OnyxMillerPane>,
  );

  // ACT
  const heading = component.locator(".onyx-miller-pane__label");
  const listItems = component.locator(".onyx-miller-item");

  // ASSERT
  await expect(heading).toHaveText("Fruit Section");
  await expect(listItems).toHaveCount(2);
});
