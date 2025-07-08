import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import type { OnyxColor } from "../../types/index.js";
import OnyxToastMessage from "./OnyxToastMessage.vue";

const TOAST_COLORS = ["neutral", "danger", "warning", "success"] satisfies OnyxColor[];

test.beforeEach(async ({ page }) => {
  await page.addStyleTag({
    content: `.onyx-toast__progress-bar {
      width: 100%
    }`,
  });
});

test.describe("Screenshot tests", () => {
  for (const mode of ["default", "clickable", "manual-close"] as const) {
    executeMatrixScreenshotTest({
      name: `Toast message (${mode})`,
      columns: DENSITIES,
      rows: TOAST_COLORS,
      component: (column, row) => (
        <OnyxToastMessage
          headline="Test toast"
          color={row}
          density={column}
          duration={mode === "manual-close" ? 0 : undefined}
          clickable={mode === "clickable"}
          // margin is used to not cut off the box shadow in the screenshot
          style={{ margin: "1rem" }}
        />
      ),
    });
  }
});

test.describe("Screenshot tests (description)", () => {
  executeMatrixScreenshotTest({
    name: "Toast message (description)",
    columns: DENSITIES,
    rows: TOAST_COLORS,
    component: (column, row) => (
      <OnyxToastMessage
        headline="Test toast"
        color={row}
        density={column}
        description="Lorem ipsum dolor sit amet consectetur. Non in felis erat velit consectetur. Sed integer non hac viverra nibh vehicula risus ultrices. Molestie cras lobortis vitae gravida et ut. Turpis nisl pharetra amet ante eu sagittis sit elementum ut."
        // margin is used to not cut off the box shadow in the screenshot
        style={{ margin: "1rem" }}
      />
    ),
  });
});

test.describe("Screenshot tests (truncation)", () => {
  executeMatrixScreenshotTest({
    name: "Toast message (truncation)",
    columns: ["default"],
    rows: ["default"],
    component: () => (
      <OnyxToastMessage
        headline={"Test".repeat(32)}
        description={"Test".repeat(96)}
        // margin is used to not cut off the box shadow in the screenshot
        style={{ margin: "1rem" }}
      />
    ),
    hooks: {
      beforeEach: async (component) => {
        await component.getByRole("paragraph").evaluate((element) => {
          element.scrollBy({ top: element.scrollHeight });
        });
      },
    },
  });
});
