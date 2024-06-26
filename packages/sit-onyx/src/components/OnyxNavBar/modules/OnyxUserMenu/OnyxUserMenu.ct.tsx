import { expect, test } from "../../../../playwright/a11y";
import {
  executeMatrixScreenshotTest,
  mockPlaywrightIcon,
} from "../../../../playwright/screenshots";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxListItem from "../../../OnyxListItem/OnyxListItem.vue";
import OnyxUserMenu from "./OnyxUserMenu.vue";

const options = [
  <OnyxListItem>
    <OnyxIcon icon={mockPlaywrightIcon} />
    Settings
  </OnyxListItem>,
  <OnyxListItem color="danger">
    <OnyxIcon icon={mockPlaywrightIcon} />
    Logout
  </OnyxListItem>,
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
      if (row === "hover") await component.getByRole("button", { name: "Jane Doe" }).hover();
      if (row === "focus-visible") {
        await page.keyboard.press("Tab");

        // since the flyout is positioned absolute, we need to set the component size accordingly
        // so the screenshot contains the whole component
        await component.evaluate((element) => {
          element.style.height = `${element.scrollHeight}px`;
          element.style.width = `${element.scrollWidth}px`;
        });
      }
    },
  });
});

test("should behave correctly", async ({ mount }) => {
  const component = await mount(<OnyxUserMenu username="Jane Doe">{options}</OnyxUserMenu>);

  const menu = component.getByLabel("User options");
  const button = component.getByRole("button", { name: "Jane Doe" });

  await expect(menu).toBeHidden();

  // should not be opened by hover
  await button.hover();
  await expect(menu).toBeHidden();

  await button.click();
  await expect(menu).toBeVisible();

  await menu.getByText("Settings").click();
  await expect(menu).toBeHidden(); // should close after clicking on option
});
