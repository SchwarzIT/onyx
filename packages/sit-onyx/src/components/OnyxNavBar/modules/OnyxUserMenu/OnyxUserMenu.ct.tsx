import { expect, test } from "../../../../playwright/a11y";
import {
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

      // since the flyout is positioned absolute, we need to set the component size accordingly
      // so the screenshot contains the whole component
      await component.evaluate((element) => {
        element.style.height = `${element.scrollHeight}px`;
        element.style.width = `${element.scrollWidth}px`;
        element.style.paddingLeft = "64px";
      });
    },
  });
});

test("should behave correctly", async ({ mount, page }) => {
  const component = await mount(<OnyxUserMenu username="Jane Doe">{options}</OnyxUserMenu>);

  const menu = component.getByLabel("User options");
  const button = component.getByRole("button", { name: "Jane Doe" });

  await expect(menu).toBeHidden();

  await button.hover();
  await expect(menu).toBeVisible();

  await page.getByRole("document").hover();
  await expect(menu).toBeHidden(); // should close after clicking on option
});
