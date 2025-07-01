import { expect, test } from "../../../../playwright/a11y";
import {
  executeMatrixScreenshotTest,
  type OnyxMatrixScreenshotHookContext,
} from "../../../../playwright/screenshots";
import OnyxBadge from "../../../OnyxBadge/OnyxBadge.vue";
import ComponentTestWrapper from "./ComponentTestWrapper.ct.vue";
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
  ["mobile", "navbar", "list"].forEach((target) => {
    executeMatrixScreenshotTest({
      name: `NavItem (${target})`,
      columns: ["default", "active"],
      rows: ["default", "hover", "focus-visible", "external-link", "badge", "with-children"],
      context,
      component: (column, row) => (
        <ComponentTestWrapper
          topLeveL={target === "navbar"}
          mobile={target === "mobile"}
          label="Parent item"
          link={row === "external-link" ? "https://onyx.schwarz" : "#"}
          active={column === "active"}
          style={{ maxWidth: "200px" }}
        >
          {row === "badge" && ["Parent item", <OnyxBadge dot color="warning" />]}

          {row === "with-children" && (
            <template v-slot:children>
              <OnyxNavItem label="Child 1" link="#" />
            </template>
          )}
        </ComponentTestWrapper>
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
  await page.setViewportSize({ height: 220, width: 180 });

  // ARRANGE
  const component = await mount(
    <OnyxNavItem label="Label">
      <template v-slot:children>
        <OnyxNavItem label="Nested item 1" link="#nested-1">
          <template v-slot:children>
            <OnyxNavItem label="Nested item 1.1" link="#nested-1-1" />
            <OnyxNavItem label="Nested item 1.2" link="#nested-1-2" />
          </template>
        </OnyxNavItem>

        <OnyxNavItem label="Nested item 2" link="#nested-2" />
      </template>
    </OnyxNavItem>,
  );

  // ACT
  await component.getByRole("menuitem", { name: "Label" }).hover();

  // ASSERT
  await expect(page).toHaveScreenshot("nested.png");

  // ACT
  await component.getByRole("menuitem", { name: "Nested item 1" }).click();

  // ASSERT
  await expect(page).toHaveScreenshot("nested-open.png");
  await expect(
    component.getByRole("menuitem", { name: "Nested item 1", exact: true }),
  ).toBeHidden();
  await expect(component.getByRole("menuitem", { name: "Nested item 1.1" })).toBeVisible();

  // ACT
  await component.getByRole("menuitem", { name: "Nested item 1.1" }).click();

  // ASSERT
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/#nested-1-1$/);
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
