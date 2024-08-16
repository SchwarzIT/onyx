import { expect, test } from "../../../../playwright/a11y";
import {
  adjustAbsolutePositionScreenshot,
  executeMatrixScreenshotTest,
  mockPlaywrightIcon,
} from "../../../../playwright/screenshots";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxMenuItem from "../OnyxMenuItem/OnyxMenuItem.vue";
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
      if (row === "default") return;

      if (row === "hover") {
        await component.getByRole("button", { name: "Jane Doe" }).hover();
      }
      if (row === "focus-visible") {
        await page.keyboard.press("Tab");
      }

      await expect(component.getByLabel("User options")).toBeVisible();

      await adjustAbsolutePositionScreenshot(component);
      await component.evaluate((element) => (element.style.paddingLeft = "64px"));
    },
  });
});

test("should behave correctly", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(<OnyxUserMenu username="Jane Doe">{options}</OnyxUserMenu>);
  const menu = component.getByLabel("User options");
  const button = component.getByRole("button", { name: "Jane Doe" });
  // ASSERT
  await expect(menu).toBeHidden();

  // ACT
  await button.hover();
  //ASSERT
  await expect(menu).toBeVisible();

  //ARRANGE
  const settingsButton = component.getByRole("menuitem", { name: "Settings" });
  // ACT
  await settingsButton.hover();
  //ASSERT
  await expect(menu).toBeVisible();

  // ACT
  await settingsButton.click();
  //ASSERT
  await expect(menu).toBeHidden();

  // ACT
  await button.hover();
  //ASSERT
  await expect(menu).toBeVisible();

  // ACT
  await page.getByRole("document").hover();
  // ASSERT
  await expect(menu).toBeHidden();
});
