import { expect, test } from "../../playwright/a11y";
import {
  executeMatrixScreenshotTest,
  type MatrixScreenshotTestOptions,
} from "../../playwright/screenshots";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import MobileComponentTestWrapper from "./MobileComponentTestWrapper.vue";
import OnyxNavItem from "./OnyxNavItem.vue";

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
    name: "NavItem",
    columns: ["default", "active"],
    rows: ["default", "hover", "focus-visible", "external-link"],
    disabledAccessibilityRules,
    component: (column, row) => (
      <OnyxNavItem
        label="Item"
        href={row === "external-link" ? "https://onyx.schwarz/" : "#"}
        active={column === "active"}
      />
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
    { href: "https://onyx.schwarz", label: "Nested Item 3" },
  ];

  executeMatrixScreenshotTest({
    name: "NavItem with nestedItems",
    columns: ["inactive", "active"],
    rows: ["hover", "focus-visible"],
    disabledAccessibilityRules,
    component: (column) => (
      <OnyxNavItem label="Item" href="#" active={column === "active"} options={nestedItems} />
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

test.describe("Screenshot tests (mobile)", () => {
  executeMatrixScreenshotTest({
    name: "NavItem (mobile)",
    columns: ["default", "active"],
    rows: ["default", "hover", "focus-visible", "external-link", "badge", "with-children"],
    disabledAccessibilityRules,
    component: (column, row) => (
      <MobileComponentTestWrapper
        label="Parent item"
        // TODO: check why external link is not shown
        href={row === "external-link" ? "https://onyx.schwarz" : "#"}
        active={column === "active"}
        options={row === "with-children" ? [{ label: "Child 1", href: "#" }] : undefined}
      >
        {row === "badge" && ["Parent item", <OnyxBadge dot color="warning" />]}
      </MobileComponentTestWrapper>
    ),
    beforeScreenshot: async (component, page, _column, row) => {
      await expect(component).toContainText("Parent item");
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });

  executeMatrixScreenshotTest({
    name: "NavItem (mobile, open children)",
    columns: ["default", "with-parent-link"],
    rows: ["default"],
    disabledAccessibilityRules,
    component: (column) => (
      <MobileComponentTestWrapper
        label="Parent item"
        // TODO: check why external link is not shown
        href={column === "with-parent-link" ? "#" : undefined}
        options={[
          { label: "Default", href: "/default" },
          { label: "Active", href: "/active", active: true },
          { label: "External link", href: "https://onyx.schwarz" },
        ]}
      >
        Parent item <OnyxBadge dot color="warning" />
      </MobileComponentTestWrapper>
    ),
    beforeScreenshot: async (component) => {
      await component.getByText("Parent item").click();
    },
  });
});
