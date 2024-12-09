import { DENSITIES } from "../../composables/density";
import { test } from "../../playwright/a11y";
import {
  executeMatrixScreenshotTest,
  mockPlaywrightIcon,
  type MatrixScreenshotTestOptions,
} from "../../playwright/screenshots";
import OnyxSystemButton from "./OnyxSystemButton.vue";

const beforeScreenshot: MatrixScreenshotTestOptions["beforeScreenshot"] = async (
  component,
  page,
  column,
  row,
) => {
  if (row === "hover") await component.hover();
  if (row === "focus-visible") await page.keyboard.press("Tab");
  if (row === "active") {
    const box = (await component.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
  }
};

test.describe("Screenshot tests", () => {
  for (const type of ["text", "icon"] as const) {
    executeMatrixScreenshotTest({
      name: `System button (${type})`,
      columns: DENSITIES,
      rows: ["default", "hover", "active", "focus-visible", "skeleton"],
      beforeScreenshot,
      component: (column, row) => (
        <OnyxSystemButton
          label="Test label"
          density={column}
          icon={type === "icon" ? mockPlaywrightIcon : undefined}
          skeleton={row === "skeleton"}
        />
      ),
    });
  }

  executeMatrixScreenshotTest({
    name: "System button (disabled)",
    columns: ["text", "icon"],
    rows: ["default", "hover", "active", "focus-visible"],
    beforeScreenshot,
    component: (column) => (
      <OnyxSystemButton
        label="Test label"
        icon={column === "icon" ? mockPlaywrightIcon : undefined}
        disabled
      />
    ),
  });
});
