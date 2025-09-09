import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxBreadcrumbItem from "./OnyxBreadcrumbItem.vue";

test.describe("Screenshot tests", () => {
  for (const type of ["text", "icon"] as const) {
    executeMatrixScreenshotTest({
      name: `Breadcrumb item (${type})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus-visible"],
      component: (column) => (
        <ul role="menu" style={{ display: "contents" }}>
          <OnyxBreadcrumbItem href="#" density={column} aria-label="Item">
            {type === "icon" ? <OnyxIcon icon={mockPlaywrightIcon} /> : "Item"}
          </OnyxBreadcrumbItem>
        </ul>
      ),
      hooks: {
        beforeEach: async (component, page, column, row) => {
          if (row === "hover") await component.hover();
          if (row === "focus-visible") await page.keyboard.press("Tab");
        },
      },
    });

    executeMatrixScreenshotTest({
      name: `Breadcrumb item (${type}, active)`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus-visible"],
      component: (column) => (
        <ul role="menu" style={{ display: "contents" }}>
          <OnyxBreadcrumbItem href="#" density={column} active aria-label="Item">
            {type === "icon" ? <OnyxIcon icon={mockPlaywrightIcon} /> : "Item"}
          </OnyxBreadcrumbItem>
        </ul>
      ),
      hooks: {
        beforeEach: async (component, page, column, row) => {
          if (row === "hover") await component.hover();
          if (row === "focus-visible") await page.keyboard.press("Tab");
        },
      },
    });
  }

  executeMatrixScreenshotTest({
    name: "Breadcrumb item (skeleton)",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <ul aria-hidden="true" style={{ display: "contents" }}>
        <OnyxBreadcrumbItem href="#" density={column} aria-label="Item" skeleton>
          Item
        </OnyxBreadcrumbItem>
      </ul>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});
