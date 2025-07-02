import { DENSITIES } from "../../../../composables/density.js";
import { expect, test } from "../../../../playwright/a11y.js";
import {
  executeMatrixScreenshotTest,
  mockPlaywrightIcon,
} from "../../../../playwright/screenshots.js";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxSidebarItem from "./OnyxSidebarItem.vue";

test.describe("Screenshot tests", () => {
  for (const type of ["default", "active"] as const) {
    executeMatrixScreenshotTest({
      name: `Sidebar item (${type})`,
      columns: ["button", "link"],
      rows: ["default", "hover", "focus-visible"],
      component: (column) => (
        <OnyxSidebarItem
          link={column === "link" ? "#test-link" : undefined}
          active={type === "active"}
        >
          <OnyxIcon icon={mockPlaywrightIcon} />
          Item
        </OnyxSidebarItem>
      ),
      hooks: {
        beforeEach: async (component, page, column, row) => {
          const button = component.getByRole(column, { name: "Item" });
          if (row === "hover") await button.hover();
          if (row === "focus-visible") await page.keyboard.press("Tab");
        },
      },
    });
  }
});

test.describe("Screenshot tests (density)", () => {
  executeMatrixScreenshotTest({
    name: "Sidebar item (density)",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxSidebarItem density={column}>
        <OnyxIcon icon={mockPlaywrightIcon} />
        Item
      </OnyxSidebarItem>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const button = component.getByRole("button", { name: "Item" });
        if (row === "hover") await button.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});

test("should open internal link with router", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(<OnyxSidebarItem link="#test-link">Label</OnyxSidebarItem>);

  // ASSERT
  await expect(component).toHaveRole("link");
  await expect(component, "should use the onyx router link").toHaveClass(/.onyx-router-link/);

  // ACT
  await component.click();

  // ASSERT
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/#test-link$/);
});
