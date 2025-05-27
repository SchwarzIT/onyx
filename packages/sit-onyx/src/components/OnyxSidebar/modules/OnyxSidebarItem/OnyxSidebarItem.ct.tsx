import { DENSITIES } from "../../../../composables/density";
import { test } from "../../../../playwright/a11y";
import {
  executeMatrixScreenshotTest,
  mockPlaywrightIcon,
} from "../../../../playwright/screenshots";
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
