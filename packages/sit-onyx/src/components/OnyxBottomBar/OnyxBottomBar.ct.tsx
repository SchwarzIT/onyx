import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxBottomBar from "./OnyxBottomBar.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Bottom Bar",
    columns: ["default", "hidden-border"],
    rows: ["right", "left", "left-and-right"],
    component: (column, row) =>
      row === "left-and-right" ? (
        <OnyxBottomBar hideBorder={column === "hidden-border"}>
          <template v-slot:left>
            <OnyxButton label="Button"></OnyxButton>
          </template>
          <template v-slot:right>
            <OnyxButton label="Button" mode="plain" color="neutral"></OnyxButton>
            <OnyxButton label="Button"></OnyxButton>
          </template>
        </OnyxBottomBar>
      ) : row === "right" ? (
        <OnyxBottomBar hideBorder={column === "hidden-border"}>
          <template v-slot:right>
            <OnyxButton label="Button" mode="plain" color="neutral"></OnyxButton>
            <OnyxButton label="Button"></OnyxButton>
          </template>
        </OnyxBottomBar>
      ) : (
        <OnyxBottomBar hideBorder={column === "hidden-border"}>
          <template v-slot:left>
            <OnyxButton label="Button" mode="plain" color="neutral"></OnyxButton>
            <OnyxButton label="Button"></OnyxButton>
          </template>
        </OnyxBottomBar>
      ),
    hooks: {
      beforeEach: async (component, page) => {
        await component.evaluate((element) => {
          element.style.padding = "5rem 0";
          element.style.paddingRight = "25rem";
        });
        await page.setViewportSize({ width: 400, height: 100 });
      },
    },
  });
});
