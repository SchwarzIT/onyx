import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxBottomBar from "./OnyxBottomBar.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Bottom Bar",
    columns: ["default"],
    rows: ["right", "left", "left-and-right", "hidden-border"],
    component: (_column, row) => {
      return (
        <OnyxBottomBar hideBorder={row === "hidden-border"} style={{ width: "32rem" }}>
          {(row.includes("left") || row === "hidden-border") && (
            <template v-slot:left>
              <OnyxButton label="Button" mode="plain" color="neutral"></OnyxButton>
              <OnyxButton label="Button"></OnyxButton>
            </template>
          )}

          {(row.includes("right") || row === "hidden-border") && [
            <OnyxButton label="Button" mode="plain" color="neutral"></OnyxButton>,
            <OnyxButton label="Button"></OnyxButton>,
          ]}
        </OnyxBottomBar>
      );
    },
  });
});
