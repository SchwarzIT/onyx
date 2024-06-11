import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";
import OnyxNavButton from "./OnyxNavButton.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "NavButton",
    columns: ["default", "active"],
    rows: ["default", "hover", "focus-visible", "external-link"],
    /**
     * This component represents only the child (menuitem) of the overall menu.
     * "aria-required-parent" test is disabled because it requires a child with role="menuitem"
     * to have a parent with role="menu".
     *
     * TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
     */
    disabledAccessibilityRules: ["aria-required-parent", "color-contrast"],
    component: (column, row) => (
      <OnyxNavButton
        label="Nav Button"
        href={row === "external-link" ? "https://onyx.schwarz/" : "#"}
        active={column === "active"}
      >
        Nav Button
      </OnyxNavButton>
    ),
    beforeScreenshot: async (component, page, _column, row) => {
      await expect(component).toContainText("Item");
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });
});

test.describe("Screenshot tests with nested children", () => {
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
      <OnyxNavButton label="Item" href="#" active={column === "active"}>
        <OnyxListItem>Nested Item 1</OnyxListItem>
        <OnyxListItem>Nested Item 2</OnyxListItem>
        <OnyxListItem>Nested Item 3</OnyxListItem>
      </OnyxNavButton>
    ),
    beforeScreenshot: async (component, page, _column, row) => {
      await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
      // since the flyout is positioned absolute, we need to set the component size accordingly
      // so the screenshot contains the whole component
      await component.evaluate((element) => {
        element.style.height = `${element.scrollHeight}px`;
        element.style.width = `${element.scrollWidth}px`;
      });
    },
  });
});
