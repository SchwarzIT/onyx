import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxCard from "./OnyxCard.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Card",
    columns: ["default", "clickable", "link"],
    rows: ["default", "focus-visible"],
    component: (column) => {
      return (
        <OnyxCard
          clickable={column === "clickable"}
          link={column === "link" ? "#test-link" : undefined}
          style={{ width: "16rem" }}
        >
          <OnyxHeadline is="h2">Card</OnyxHeadline>
          Lorem ipsum dolor sit amet consectetur. Id neque viverra faucibus ullamcorper dui
          volutpat.
        </OnyxCard>
      );
    },
    hooks: {
      beforeEach: async (component, page, column, row) => {
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});

test("should render as link", async ({ page, mount }) => {
  // ARRANGE
  const component = await mount(<OnyxCard link="#test">Card content</OnyxCard>);

  // ASSERT
  await expect(component).toHaveRole("link");

  // ACT
  await component.click();

  // ASSERT
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/#test$/);
});
