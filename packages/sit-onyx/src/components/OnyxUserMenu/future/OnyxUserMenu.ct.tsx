import type { Locator } from "@playwright/test";
import { expect, test } from "../../../playwright/a11y";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../../playwright/screenshots";
import OnyxIcon from "../../OnyxIcon/OnyxIcon.vue";
import OnyxMenuItem from "../../OnyxMenuItem/OnyxMenuItem.vue";
import OnyxUserMenu from "./OnyxUserMenu.vue";

const options = [
  <OnyxMenuItem>
    <OnyxIcon icon={mockPlaywrightIcon} />
    Settings
  </OnyxMenuItem>,
  <OnyxMenuItem color="danger">
    <OnyxIcon icon={mockPlaywrightIcon} />
    Logout
  </OnyxMenuItem>,
];

test.describe("Screenshot tests", () => {
  const isFlyoutVisible = async (flyout: Locator) => {
    await expect(flyout).toBeVisible();
  };

  executeMatrixScreenshotTest({
    name: "User menu",
    columns: ["default", "description", "footer"],
    rows: ["default", "hover", "focus-visible"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column) => (
      <OnyxUserMenu
        username="Jane Doe"
        description={column === "description" ? "Company name" : undefined}
      >
        {options}
        {column === "footer" ? <template v-slot:footer>Footer slot content</template> : undefined}
      </OnyxUserMenu>
    ),
    beforeScreenshot: async (component, page, column, row) => {
      const flyout = component.getByLabel("Navigation");
      if (row === "focus-visible") await page.keyboard.press("Tab");

      if (row === "hover" || row === "focus-visible") {
        if (row === "hover") {
          await component.getByRole("button", { name: "Jane Doe" }).hover();
          await isFlyoutVisible(flyout);
        }

        // since the flyout is positioned absolute, we need to set the component size accordingly
        // so the screenshot contains the whole component
        await component.evaluate((element) => {
          element.style.height = `${element.scrollHeight}px`;
          element.style.paddingLeft = `60px`;
        });
      }
    },
  });
});

test("should behave correctly", async ({ mount, page }) => {
  const component = await mount(<OnyxUserMenu username="Jane Doe">{options}</OnyxUserMenu>);

  const menu = component.getByLabel("Navigation");
  const button = component.getByRole("button", { name: "Jane Doe" });
  const menuItem = menu.getByRole("menuitem");

  await expect(menu).toBeHidden();

  // should be opened by hover
  await button.hover();
  await expect(menu).toBeVisible();

  // should be opened with focus-visible
  await button.focus();
  await expect(menu).toBeVisible();

  // first menu item should be focused
  page.keyboard.press("ArrowDown");
  await expect(menuItem.first()).toBeFocused();

  // second menu item should be focused
  page.keyboard.press("ArrowDown");
  await expect(menuItem.nth(1)).toBeFocused();

  // first menu item should be focused
  page.keyboard.press("ArrowUp");
  await expect(menuItem.first()).toBeFocused();

  page.keyboard.press("Tab");

  // should be opened on tab
  page.keyboard.press("Tab");
  await expect(menu).toBeVisible();

  // first menu item should be focused
  page.keyboard.press("Home");
  await expect(menuItem.first()).toBeFocused();

  // Close the flyout and then open it again
  page.keyboard.press("Tab");
  page.keyboard.press("Tab");

  // last menu item should be focused
  page.keyboard.press("End");
  await expect(menuItem.last()).toBeFocused();
});
