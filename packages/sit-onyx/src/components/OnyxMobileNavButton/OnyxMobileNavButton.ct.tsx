import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots";
import OnyxMobileNavButton from "./OnyxMobileNavButton.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Mobile nav button",
    columns: ["default", "open"],
    rows: ["default", "hover", "active", "focus-visible"],
    component: (column) => (
      <OnyxMobileNavButton label="Label" icon={mockPlaywrightIcon} open={column === "open"} />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
      if (row === "active") {
        const box = (await component.boundingBox())!;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
      }
    },
  });
});
