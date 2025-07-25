import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxBreadcrumbItem from "../OnyxBreadcrumbItem/OnyxBreadcrumbItem.vue";
import OnyxBreadcrumb from "./OnyxBreadcrumb.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Breadcrumb",
    columns: ["default", "custom-home", "container", "skeleton"],
    rows: ["0", "1", "2"],
    component: (column, row) => {
      const itemCount = Number.parseInt(row);

      return (
        <OnyxBreadcrumb
          container={column === "container"}
          home={column === "custom-home" ? { label: "Custom home" } : undefined}
          skeleton={column === "skeleton"}
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

test("should be aligned with the grid when in container mode", async ({ page, mount }) => {
  await page.addStyleTag({
    content: `body { margin: 0; }`,
  });

  await page.setViewportSize({ width: ONYX_BREAKPOINTS.xl, height: 256 });

  await mount(
    <div style={{ containerType: "inline-size" }}>
      <OnyxBreadcrumb container>
        <OnyxBreadcrumbItem href="#">Item 1</OnyxBreadcrumbItem>
        <OnyxBreadcrumbItem href="#">Item 2</OnyxBreadcrumbItem>
        <OnyxBreadcrumbItem href="#" active>
          Item 3
        </OnyxBreadcrumbItem>
      </OnyxBreadcrumb>
      <div class="onyx-grid-layout">
        <div
          style={{
            backgroundColor: "var(--onyx-color-base-info-300)",
            fontFamily: "var(--onyx-font-family)",
          }}
        >
          Page content...
        </div>
      </div>
    </div>,
  );

  await expect(page).toHaveScreenshot("grid.png");
  const gridLayout = page.locator(".onyx-grid-layout");
  const breadcrumb = page.locator(".onyx-breadcrumb--container");

  await gridLayout.evaluate((element) =>
    element.classList.add("onyx-grid-max-md", "onyx-grid-center"),
  );
  await breadcrumb.evaluate((element) =>
    element.classList.add("onyx-grid-max-md", "onyx-grid-center"),
  );

  await expect(page).toHaveScreenshot("grid-max-width.png");
});
