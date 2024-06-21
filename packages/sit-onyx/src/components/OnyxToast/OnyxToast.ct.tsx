import { DENSITIES } from "../../composables/density";
import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import type { OnyxColor } from "../../types";
import OnyxToast from "./OnyxToast.vue";

const TOAST_COLORS = ["neutral", "danger", "warning", "success"] satisfies OnyxColor[];

const MOCK_NOW = new Date(2024, 0, 1, 12);

test.beforeEach(async ({ page }) => {
  await page.evaluate((mockNow) => {
    Date.now = () => mockNow.getTime();
  }, MOCK_NOW);
});

test.describe("Screenshot tests", () => {
  for (const mode of ["default", "clickable", "manual-close"] as const) {
    executeMatrixScreenshotTest({
      name: `Toast (${mode})`,
      columns: DENSITIES,
      rows: TOAST_COLORS,
      // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
      disabledAccessibilityRules: ["color-contrast"],
      component: (column, row) => (
        <OnyxToast
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
    name: "Toast (description)",
    columns: DENSITIES,
    rows: TOAST_COLORS,
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => (
      <OnyxToast
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
    name: "Toast (truncation)",
    columns: ["default"],
    rows: ["default"],
    component: () => (
      <OnyxToast
        headline={"Test".repeat(32)}
        description={"Test".repeat(96)}
        // margin is used to not cut off the box shadow in the screenshot
        style={{ margin: "1rem" }}
      />
    ),
    beforeScreenshot: async (component) => {
      await component.getByRole("paragraph").evaluate((element) => {
        element.scrollBy({ top: element.scrollHeight });
      });
    },
  });
});
