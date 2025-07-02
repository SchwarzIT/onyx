import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots.js";
import OnyxProgressStep from "./OnyxProgressStep.vue";
import { PROGRESS_STEP_STATUS } from "./types.js";

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

test.describe("Screenshot tests (density)", () => {
  executeMatrixScreenshotTest({
    name: "Progress step (density)",
    columns: DENSITIES,
    rows: ["default", "skeleton"],
    component: (column, row) => (
      <OnyxProgressStep label="Step" value={1} density={column} skeleton={row === "skeleton"} />
    ),
  });
});
