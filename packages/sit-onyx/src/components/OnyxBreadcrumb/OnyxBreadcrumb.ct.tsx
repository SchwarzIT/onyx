import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxBreadcrumbItem from "../OnyxBreadcrumbItem/OnyxBreadcrumbItem.vue";
import OnyxBreadcrumb from "./OnyxBreadcrumb.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Breadcrumb",
    columns: ["default", "custom-home", "container"],
    rows: ["0", "1", "2"],
    component: (column, row) => {
      const itemCount = Number.parseInt(row);

      return (
        <OnyxBreadcrumb
          container={column === "container"}
          home={column === "custom-home" ? { label: "Custom home" } : undefined}
        >
          {Array.from({ length: itemCount }, (_, index) => (
            <OnyxBreadcrumbItem href="#" active={index === itemCount - 1}>
              Item {index + 1}
            </OnyxBreadcrumbItem>
          ))}
        </OnyxBreadcrumb>
      );
    },
    hooks: {
      beforeEach: async (component, page) => {
        await page.addStyleTag({
          content: "body { background-color: var(--onyx-color-base-background-tinted); }",
        });
      },
    },
  });
});
