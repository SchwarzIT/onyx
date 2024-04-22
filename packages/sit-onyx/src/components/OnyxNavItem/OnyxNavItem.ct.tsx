import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxNavItem from "./OnyxNavItem.vue";

test("should render", async ({ mount }) => {
  // ARRANGE
  const component = await mount(OnyxNavItem, {
    props: {
      label: "Item",
      children: [
        { href: "#", label: "Nested Item 1" },
        { href: "#", label: "Nested Item 2" },
        { href: "#", label: "Nested Item 3" },
      ],
    },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");

  /**
   * We don't have a11y tests here beacuese of the ARIA rule which requires all elements with
   * role="menuitem" to have a parent with role="menu".
   * This is not possible in our case because we are only implementing the component with role="menuitem"
   * Reference -> https://accessibilityinsights.io/info-examples/web/aria-required-parent/
   */
});

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "NavItem",
    columns: ["default", "active"],
    rows: ["default", "hover", "focus-visible"],
    disabledAccessibilityRules: ["aria-required-parent"],
    component: (column) => (
      <OnyxNavItem label="Item" href="#" active={column === "active"}></OnyxNavItem>
    ),
    beforeScreenshot: async (component, page, _column, row) => {
      await expect(component).toContainText("Item");
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });
});
