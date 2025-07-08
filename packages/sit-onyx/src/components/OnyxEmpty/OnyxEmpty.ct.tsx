import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots.js";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxEmpty from "./OnyxEmpty.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Empty",
    columns: DENSITIES,
    rows: ["default", "custom-icon", "buttons", "multiline"],
    removePadding: true,
    component: (column, row) => (
      <OnyxEmpty density={column} style={{ width: row === "multiline" ? "12rem" : undefined }}>
        {row === "multiline" ? "Very long text that will be wrapped" : "Example empty text"}

        {row === "custom-icon" && (
          <template v-slot:icon>
            <OnyxIcon icon={mockPlaywrightIcon} color="danger" size="48px" />
          </template>
        )}

        {row === "buttons" && (
          <template v-slot:buttons>
            <OnyxButton label="Button" color="neutral" />
            <OnyxButton label="Button" />
          </template>
        )}
      </OnyxEmpty>
    ),
  });
});
