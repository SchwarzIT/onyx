import { test } from "../../playwright/a11y";
import {
  executeMatrixScreenshotTest,
  mockPlaywrightIcon,
  type MatrixScreenshotTestOptions,
} from "../../playwright/screenshots";
import OnyxSystemButton from "./OnyxSystemButton.vue";
import { SYSTEM_BUTTON_COLORS } from "./types";

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

test.beforeEach(async ({ page }) => {
  await page.addStyleTag({
    content: `body {
    background-color: var(--onyx-color-base-background-tinted);
  }`,
  });
});

for (const color of SYSTEM_BUTTON_COLORS) {
  test.describe(`Screenshot tests (${color})`, () => {
    executeMatrixScreenshotTest({
      name: `System button (${color})`,
      columns: ["text", "icon"],
      rows: ["default", "hover", "active", "focus-visible", "skeleton"],
      beforeScreenshot,
      component: (column, row) => (
        <OnyxSystemButton
          label="Test label"
          icon={column === "icon" ? mockPlaywrightIcon : undefined}
          skeleton={row === "skeleton"}
          color={color}
        />
      ),
    });

    executeMatrixScreenshotTest({
      name: `System button (${color}, disabled)`,
      columns: ["text", "icon"],
      rows: ["default", "hover", "active", "focus-visible"],
      beforeScreenshot,
      component: (column) => (
        <OnyxSystemButton
          label="Test label"
          icon={column === "icon" ? mockPlaywrightIcon : undefined}
          color={color}
          disabled
        />
      ),
    });
  });
}
