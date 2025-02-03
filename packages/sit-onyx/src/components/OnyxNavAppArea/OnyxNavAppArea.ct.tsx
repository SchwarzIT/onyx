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
    hooks: {
      beforeEach: async (component, page, column, row) => {
        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
        if (row === "active") {
          const box = (await component.boundingBox())!;
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await page.mouse.down();
        }
      },
    },
  });
});

test("should behave correctly", async ({ mount, page }) => {
  // ARRANGE
  let component = await mount(
    <div>
      <OnyxNavAppArea>Test app name</OnyxNavAppArea>
    </div>,
  );

  const link = component.getByRole("link", { name: "Go to home page" });

  // ASSERT
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", "/");

  // ACT
  component = await mount(
    <div>
      <OnyxNavAppArea link={{ href: "/test" }}>Test app name</OnyxNavAppArea>
    </div>,
  );

  // ASSERT
  await expect(link).toHaveAttribute("href", "/test");

  // ACT
  await page.route("**/test", (route) => route.fulfill({ body: "Test page" }));
  await link.click();

  // ASSERT
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/test$/);
});
