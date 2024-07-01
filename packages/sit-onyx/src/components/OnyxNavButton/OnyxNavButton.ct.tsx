import type { Locator } from "@playwright/test";
import { expect, test } from "../../playwright/a11y";
import {
  executeMatrixScreenshotTest,
  type MatrixScreenshotTestOptions,
} from "../../playwright/screenshots";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxNavItem from "../OnyxNavItem/OnyxNavItem.vue";
import MobileComponentTestWrapper from "./MobileComponentTestWrapper.vue";
import OnyxNavButton from "./OnyxNavButton.vue";

/**
 * This component represents only the child (menuitem) of the overall menu.
 * "aria-required-parent" test is disabled because it requires a child with role="menuitem"
 * to have a parent with role="menu".
 *
 * TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
 */
const disabledAccessibilityRules: MatrixScreenshotTestOptions["disabledAccessibilityRules"] = [
  "aria-required-parent",
  "color-contrast",
];

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "NavButton",
    columns: ["default", "active"],
    rows: ["default", "hover", "focus-visible", "external-link"],
    disabledAccessibilityRules,
    component: (column, row) => (
      <OnyxNavButton
        label="Nav Button"
        href={row === "external-link" ? "https://onyx.schwarz/" : "#"}
        active={column === "active"}
      />
    ),
    beforeScreenshot: async (component, page, _column, row) => {
      await expect(component).toContainText("Nav Button");
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });
});

test.describe("Screenshot tests with nested children", () => {
  const isFlyoutVisible = async (flyout: Locator) => {
    await expect(flyout).toBeVisible();
  };

  executeMatrixScreenshotTest({
    name: "NavButton with nested children",
    columns: ["inactive", "active"],
    rows: ["hover", "focus-visible"],
    /**
     * This component represents only the child (menuitem) of the overall menu.
     * "aria-required-parent" test is disabled because it requires a child with role="menuitem"
     * to have a parent with role="menu".
     *
     * "aria-required-children" test is disabled because it's a slot based component
     *
     * TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
     */
    disabledAccessibilityRules: [...disabledAccessibilityRules, "aria-required-children"],
    component: (column) => (
      <OnyxNavButton label="Item" href="#" active={column === "active"}>
        <template v-slot:children>
          <OnyxNavItem>Nested Item 1</OnyxNavItem>
          <OnyxNavItem>Nested Item 2</OnyxNavItem>
          <OnyxNavItem>Nested Item 3</OnyxNavItem>
        </template>
      </OnyxNavButton>
    ),
    beforeScreenshot: async (component, page, _column, row) => {
      const flyout = page.getByLabel("Subpages of Item");
      await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
      // since the flyout is positioned absolute, we need to set the component size accordingly
      // so the screenshot contains the whole component
      await component.evaluate((element) => {
        element.style.height = "200px";
        element.style.width = "100px";
      });

      await isFlyoutVisible(flyout);
    },
  });
});

test.describe("Screenshot tests (mobile)", () => {
  executeMatrixScreenshotTest({
    name: "NavButton (mobile)",
    columns: ["default", "active"],
    rows: ["default", "hover", "focus-visible", "external-link", "badge", "with-children"],
    disabledAccessibilityRules,
    component: (column, row) => (
      <MobileComponentTestWrapper
        label="Parent item"
        href={row === "external-link" ? "https://onyx.schwarz" : "#"}
        active={column === "active"}
      >
        {row === "badge" && ["Parent item", <OnyxBadge dot color="warning" />]}

        <template v-slot:children>
          <OnyxNavItem href="#">Child 1</OnyxNavItem>
        </template>
      </MobileComponentTestWrapper>
    ),
    beforeScreenshot: async (component, page, _column, row) => {
      await expect(component).toContainText("Parent item");
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });
});

test.describe("Screenshot tests (mobile children)", () => {
  executeMatrixScreenshotTest({
    name: "NavButton (mobile, open children)",
    columns: ["default", "with-parent-link"],
    rows: ["default"],
    disabledAccessibilityRules,
    component: (column) => (
      <MobileComponentTestWrapper
        label="Parent item"
        // TODO: check why external link is not shown
        href={column === "with-parent-link" ? "#" : undefined}
      >
        Parent item <OnyxBadge dot color="warning" />
        <template v-slot:children>
          <OnyxNavItem href="/default">Default</OnyxNavItem>
          <OnyxNavItem href="/active">Active</OnyxNavItem>
          <OnyxNavItem href="https://onyx.schwarz">External link</OnyxNavItem>
        </template>
      </MobileComponentTestWrapper>
    ),
    beforeScreenshot: async (component) => {
      await component.getByText("Parent item").click();
    },
  });
});
