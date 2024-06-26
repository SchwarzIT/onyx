import { expect, test } from "../../playwright/a11y";
import {
  MOCK_PLAYWRIGHT_LOGO_URL,
  MOCK_PLAYWRIGHT_LOGO_WIDE_URL,
  defineLogoMockRoutes,
  executeMatrixScreenshotTest,
  mockPlaywrightIcon,
} from "../../playwright/screenshots";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxNavAppArea from "./OnyxNavAppArea.vue";

test.beforeEach(async ({ page }) => {
  await defineLogoMockRoutes(page);
});

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Nav app area",
    columns: ["default", "wide-logo", "no-logo", "no-name", "custom-content"],
    rows: ["default", "hover", "active", "focus-visible"],
    component: (column) => {
      let logoUrl: string | undefined;
      if (column !== "no-logo") {
        logoUrl = column === "wide-logo" ? MOCK_PLAYWRIGHT_LOGO_WIDE_URL : MOCK_PLAYWRIGHT_LOGO_URL;
      }

      return (
        <OnyxNavAppArea appName={column === "no-name" ? undefined : "App name"} logoUrl={logoUrl}>
          {column === "custom-content" && [
            <OnyxIcon icon={mockPlaywrightIcon} />,
            <i>Custom content</i>,
          ]}
        </OnyxNavAppArea>
      );
    },
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

test("should behave correctly", async ({ mount }) => {
  let appAreaClickEvents = 0;

  const component = await mount(<OnyxNavAppArea onClick={() => appAreaClickEvents++} />);

  await component.click();
  expect(appAreaClickEvents).toBe(1);
});
