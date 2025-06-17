import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots";
import OnyxProgressStep from "./OnyxProgressStep.vue";
import { PROGRESS_STEP_STATUS } from "./types";

test.describe("Screenshot tests", () => {
  for (const status of PROGRESS_STEP_STATUS) {
    executeMatrixScreenshotTest({
      name: `Progress step (${status})`,
      columns: ["number", "icon", "disabled"],
      rows: ["default", "hover", "focus-visible"],
      component: (column) => (
        <OnyxProgressStep
          label="Step"
          value={1}
          icon={column === "icon" ? mockPlaywrightIcon : undefined}
          status={status}
          disabled={column === "disabled"}
        />
      ),
      hooks: {
        beforeEach: async (component, page, column, row) => {
          if (row === "hover") await component.hover();
          if (row === "focus-visible") await page.keyboard.press("Tab");
        },
      },
    });
  }
});
