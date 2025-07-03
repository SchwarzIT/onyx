import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density";
import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots";
import OnyxFabButton from "./OnyxFabButton.vue";

test.describe("Screenshot tests", () => {
  for (const type of ["hideLabel", "text", "link"] as const) {
    executeMatrixScreenshotTest({
      name: `Fab button (${type})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus-visible"],
      component: (column) => (
        <OnyxFabButton
          label="Label"
          icon={mockPlaywrightIcon}
          hideLabel={type === "hideLabel"}
          link={type === "link" ? "#example" : undefined}
          density={column}
        />
      ),
      hooks: {
        beforeEach: async (component, page, column, row) => {
          await useFocusStateHooks(component, page, row);
        },
      },
    });
  }
});
