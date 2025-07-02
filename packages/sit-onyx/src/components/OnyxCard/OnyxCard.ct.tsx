import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxCard from "./OnyxCard.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Card",
    columns: ["default", "clickable"],
    rows: ["default", "focus-visible"],
    component: (column) => {
      return (
        <OnyxCard clickable={column === "clickable"} style={{ width: "16rem" }}>
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
