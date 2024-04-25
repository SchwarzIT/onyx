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
      <OnyxNavItem label="Item" href="#" active={column === "active"}></OnyxNavItem>
    ),
    beforeScreenshot: async (component, page, _column, row) => {
      await expect(component).toContainText("Item");
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });
});

test.describe("Screenshot tests with nestedItems", () => {
  const nestedItems = [
    { href: "#", label: "Nested Item 1" },
    { href: "#2", label: "Nested Item 2" },
    { href: "#3", label: "Nested Item 3" },
  ];

  executeMatrixScreenshotTest({
    name: "NavItem with nestedItems",
    columns: ["inactive", "active"],
    rows: ["hover", "focus-visible"],
    /**
     * This component represents only the child (menuitem) of the overall menu.
     * "aria-required-parent" test is disabled because it requires a child with role="menuitem"
     * to have a parent with role="menu".
     *
     * TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
     */
    disabledAccessibilityRules: ["aria-required-parent", "color-contrast"],
    component: (column) => (
      <OnyxNavItem label="Item" href="#" active={column === "active"} options={nestedItems} />
    ),
    beforeScreenshot: async (component, page, _column, row) => {
      await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });
});
