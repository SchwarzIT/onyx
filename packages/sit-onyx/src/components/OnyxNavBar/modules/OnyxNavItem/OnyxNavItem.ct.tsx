import type { Locator } from "@playwright/test";
import { adjustSizeToAbsolutePosition } from "@sit-onyx/playwright-utils";
import { expect, test } from "../../../../playwright/a11y";
import {
  executeMatrixScreenshotTest,
  type OnyxMatrixScreenshotHookContext,
} from "../../../../playwright/screenshots";
import OnyxBadge from "../../../OnyxBadge/OnyxBadge.vue";
import MobileComponentTestWrapper from "./MobileComponentTestWrapper.ct.vue";
import OnyxNavItem from "./OnyxNavItem.vue";
import RouterTestWrapperCt from "./RouterTestWrapper.ct.vue";

const context = {
  /**
   * This component represents only the child (menuitem) of the overall menu.
   * "aria-required-parent" test is disabled because it requires a child with role="menuitem"
   * to have a parent with role="menu".
   */
  disabledAccessibilityRules: ["aria-required-parent"],
} satisfies OnyxMatrixScreenshotHookContext;

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "NavItem",
    columns: ["default", "active"],
    rows: ["default", "hover", "focus-visible", "external-link"],
    context,
    component: (column, row) => (
      <OnyxNavItem
        label="Nav Item"
        link={row === "external-link" ? "https://onyx.schwarz/" : "#"}
        active={column === "active"}
      />
    ),
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        await expect(component).toContainText("Nav Item");
        if (row === "hover") await component.getByRole("menuitem", { name: "Nav Item" }).hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
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
    context: {
      disabledAccessibilityRules: [
        ...context.disabledAccessibilityRules, // "aria-required-children" test is disabled because it's a slot based component
        "aria-required-children",
      ],
    },
    component: (column) => (
      <OnyxNavItem label="Item" link="#" active={column === "active"}>
        <template v-slot:children>
          <OnyxNavItem label="Nested Item 1" />
          <OnyxNavItem label="Nested Item 2" />
          <OnyxNavItem label="Nested Item 3" />
        </template>
      </OnyxNavItem>
    ),
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");

        const flyout = page.getByLabel("Subpages of Item");
        await isFlyoutVisible(flyout);
        await adjustSizeToAbsolutePosition(component);
      },
    },
  });
});

test.describe("Screenshot tests (mobile)", () => {
  executeMatrixScreenshotTest({
    name: "NavButton (mobile)",
    columns: ["default", "active"],
    rows: ["default", "hover", "focus-visible", "external-link", "badge", "with-children"],
    context,
    component: (column, row) => (
      <MobileComponentTestWrapper
        label="Parent item"
        link={row === "external-link" ? "https://onyx.schwarz" : "#"}
        active={column === "active"}
      >
        {row === "badge" && ["Parent item", <OnyxBadge dot color="warning" />]}

        {row === "with-children" && (
          <template v-slot:children>
            <OnyxNavItem label="Child 1" link="#" />
          </template>
        )}
      </MobileComponentTestWrapper>
    ),
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        await expect(component).toContainText("Parent item");
        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});

test.describe("Screenshot tests (mobile children)", () => {
  executeMatrixScreenshotTest({
    name: "NavButton (mobile, open children)",
    columns: ["default", "with-parent-link"],
    rows: ["default", "parent-active", "child-active"],
    removePadding: true,
    context,
    component: (column, row) => (
      <MobileComponentTestWrapper
        label="Parent item"
        link={column === "with-parent-link" ? "#" : undefined}
        active={row === "parent-active"}
      >
        Parent item <OnyxBadge dot color="warning" />
        <template v-slot:children>
          <OnyxNavItem label="Default" link="/default" active={row === "child-active"} />
          <OnyxNavItem label="External link" link="https://onyx.schwarz" />
        </template>
      </MobileComponentTestWrapper>
    ),
    hooks: {
      beforeEach: async (component) => {
        await component.getByText("Parent item").click();
        await component.hover({ position: { x: 0, y: 0 } }); // reset mouse
      },
    },
  });
});

test("should behave correctly without link", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<OnyxNavItem label="Label" />);

  // ACT
  const menuitem = component.getByRole("menuitem", { name: "Label" });

  // ASSERT
  await expect(menuitem).toBeEnabled();
});

test("should behave correctly with link", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(<OnyxNavItem label="Label" link="#link" />);

  // ACT
  await component.getByRole("menuitem", { name: "Label" }).click();

  // ASSERT
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/#link$/);
});

test("should behave correctly with nested children", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(
    <OnyxNavItem label="Label">
      <template v-slot:children>
        <OnyxNavItem label="Nested item 1" link="#nested-1" />
      </template>
    </OnyxNavItem>,
  );

  // ACT
  await component.getByRole("menuitem", { name: "Label" }).hover();
  await component.getByRole("menuitem", { name: "Nested item 1" }).click();

  // ASSERT
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/#nested-1$/);
});

test("should auto detect active state based on provided router", async ({ mount }) => {
  // ARRANGE

  const component = await mount(RouterTestWrapperCt, {
    props: {
      currentRoute: "/test",
      label: "Test label",
      link: "/test",
    },
  });

  const menuitem = component.getByRole("menuitem");

  // ASSERT
  await expect(menuitem, "should be active if current route matches").toHaveAttribute(
    "aria-current",
    "page",
  );

  // ACT
  await component.update({ props: { active: false } });

  // ASSERT
  await expect(
    menuitem,
    "should not be active if current route matches but explicitly set false",
  ).not.toHaveAttribute("aria-current");

  // ACT
  await component.update({ props: { currentRoute: "/not-test", active: "auto" } });

  // ASSERT
  await expect(
    menuitem,
    "should NOT be active if current route does not match",
  ).not.toHaveAttribute("aria-current");

  // ACT
  await component.update({ props: { active: true } });

  // ASSERT
  await expect(menuitem, "should be active if explicitly set true").toHaveAttribute("aria-current");
});
