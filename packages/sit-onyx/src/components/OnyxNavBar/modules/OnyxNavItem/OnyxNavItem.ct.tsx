import { expect, test } from "../../../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../../../playwright/screenshots";
import OnyxNavItem from "./OnyxNavItem.vue";
import RouterTestWrapperCt from "./RouterTestWrapper.ct.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "NavItem",
    columns: ["default", "active"],
    rows: ["default", "hover", "focus-visible", "external-link"],
    component: (column, row) => (
      <ul style={{ listStyle: "none", padding: 0 }} role="menu">
        <OnyxNavItem
          label="Item"
          link={row === "external-link" ? "https://onyx.schwarz" : "#"}
          active={column === "active"}
        />
      </ul>
    ),
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        await expect(component).toContainText("Item");
        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});

test("should behave correctly", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(<OnyxNavItem label="Label" link="#link" />);

  // ACT
  await component.getByRole("menuitem", { name: "Label" }).click();

  // ASSERT
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/#link$/);
});

test("should auto detect active state based on provided router", async ({ mount }) => {
  // ARRANGE
  const activeClassName = /onyx-list-item--active/;

  const component = await mount(RouterTestWrapperCt, {
    props: {
      currentRoute: "/test",
      label: "Test label",
      link: "/test",
    },
  });

  // ASSERT
  await expect(component, "should be active if current route matches").toHaveClass(activeClassName);

  // ACT
  await component.update({ props: { active: false } });

  // ASSERT
  await expect(
    component,
    "should not be active if current route matches but explicitly set false",
  ).not.toHaveClass(activeClassName);

  // ACT
  await component.update({ props: { currentRoute: "/not-test", active: "auto" } });

  // ASSERT
  await expect(component, "should NOT be active if current route does not match").not.toHaveClass(
    activeClassName,
  );

  // ACT
  await component.update({ props: { active: true } });

  // ASSERT
  await expect(component, "should be active if explicitly set true").toHaveClass(activeClassName);
});
