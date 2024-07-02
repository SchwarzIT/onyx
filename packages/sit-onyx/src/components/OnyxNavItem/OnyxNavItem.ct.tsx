import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxNavItem from "./OnyxNavItem.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "NavItem",
    columns: ["default", "active"],
    rows: ["default", "hover", "focus-visible"],
    /**
     * This component represents only the child (menuitem) of the overall menu.
     * "aria-required-parent" test is disabled because it requires a child with role="menuitem"
     * to have a parent with role="menu".
     *
     * TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
     */
    disabledAccessibilityRules: ["aria-required-parent", "color-contrast"],
    component: (column) => (
      <ul style={{ listStyle: "none", padding: 0 }} role="menu">
        <OnyxNavItem href="#" active={column === "active"}>
          Item
        </OnyxNavItem>
      </ul>
    ),
    beforeScreenshot: async (component, page, _column, row) => {
      await expect(component).toContainText("Item");
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });
});
