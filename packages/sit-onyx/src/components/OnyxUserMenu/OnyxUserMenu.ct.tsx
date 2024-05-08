import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots";
import type { ListboxOption } from "../OnyxListbox/types";
import OnyxUserMenu from "./OnyxUserMenu.vue";

const options = [
  { value: "/settings", label: "Settings", icon: mockPlaywrightIcon },
  { value: "logout", label: "Logout", icon: mockPlaywrightIcon, color: "danger" },
] satisfies ListboxOption[];

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
        options={options}
      >
        {column === "footer" ? <template v-slot:footer>Footer slot content</template> : undefined}
      </OnyxUserMenu>
    ),
    beforeScreenshot: async (component, page, column, row) => {
      if (row === "hover") await component.getByRole("button", { name: "Jane Doe" }).hover();
      if (row === "focus-visible") {
        await page.keyboard.press("Tab");

        // since the listbox is positioned absolute, we need to set the component size accordingly
        // so the screenshot contains the whole component
        await component.evaluate((element) => {
          element.style.height = `${element.scrollHeight}px`;
          element.style.width = `${element.scrollWidth}px`;
        });
      }
    },
  });
});
