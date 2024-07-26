import { DENSITIES } from "../../composables/density";
import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxEmpty from "./OnyxEmpty.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Empty",
    columns: DENSITIES,
    rows: ["default", "custom-icon", "multiline"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => (
      <OnyxEmpty density={column} style={{ width: row === "multiline" ? "12rem" : undefined }}>
        {row === "multiline" ? "Very long text that will be wrapped" : "Example empty text"}

        {row === "custom-icon" && (
          <template v-slot:icon>
            <OnyxIcon icon={mockPlaywrightIcon} color="danger" size="48px" />
          </template>
        )}
      </OnyxEmpty>
    ),
  });
});
