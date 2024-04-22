import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxNavItem from "./OnyxNavItem.vue";

test("should render", async ({ mount }) => {
  // ARRANGE
  await mount(OnyxNavItem, {
    props: {
      label: "Item",
      children: [
        { href: "#", label: "Nested Item 1" },
        { href: "#2", label: "Nested Item 2" },
        { href: "#3", label: "Nested Item 3" },
      ],
    },
  });

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
    disabledAccessibilityRules: ["aria-required-parent", "color-contrast"],
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

test.describe("Screenshot tests with children", () => {
  const children = [
    { href: "#", label: "Nested Item 1" },
    { href: "#2", label: "Nested Item 2" },
    { href: "#3", label: "Nested Item 3" },
  ];

  executeMatrixScreenshotTest({
    name: "NavItem with children",
    columns: ["default", "active", "focus-visible"],
    rows: ["hover"],
    disabledAccessibilityRules: ["aria-required-parent", "color-contrast"],
    component: (column) => (
      <OnyxNavItem
        label="Item"
        href="#"
        active={column === "active"}
        children={children}
      ></OnyxNavItem>
    ),
    beforeScreenshot: async (component, page, column, _row) => {
      await expect(component).toContainText("Item");
      await component.hover();
      if (column === "focus-visible") await page.keyboard.press("Tab");
    },
  });
});
