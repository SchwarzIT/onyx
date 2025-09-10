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

  const component = await mount(
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

  await component.evaluate((element) =>
    element.classList.add("onyx-grid-max-md", "onyx-grid-center"),
  );

  await expect(page).toHaveScreenshot("grid-max-width.png");
});
test("should show more button, when there is not enough space", async ({ page, mount }) => {
  // ARRANGE
  await page.addStyleTag({
    content: `body { margin: 0; }`,
  });

  await page.setViewportSize({ width: ONYX_BREAKPOINTS.md, height: 500 });

  const component = await mount(
    <OnyxBreadcrumb>
      {Array.from({ length: 6 }, (_, index) => (
        <OnyxBreadcrumbItem href="#">Item {index + 1}</OnyxBreadcrumbItem>
      ))}
    </OnyxBreadcrumb>,
  );

  // ASSERT
  await expect(component.getByRole("link", { name: `Home` })).toBeVisible();
  for (let i = 0; i < 6; i++) {
    const item = page.getByRole("link", { name: `Item ${i + 1}` });
    await expect(item).toBeVisible();
  }

  // ACT
  await page.setViewportSize({ width: ONYX_BREAKPOINTS["2xs"], height: 256 });

  // ASSERT
  await expect(component.getByRole("link", { name: `Home` })).toBeVisible();
  for (let i = 0; i < 3; i++) {
    const item = page.getByRole("link", { name: `Item ${i + 1}` });
    await expect(item).toBeHidden();
  }
  for (let i = 3; i < 6; i++) {
    const item = page.getByRole("link", { name: `Item ${i + 1}` });
    await expect(item).toBeVisible();
  }

  await expect(page).toHaveScreenshot("truncated-more-list.png");

  // ACT
  await component.getByRole("button", { name: "Show more items" }).click();

  // ASSERT
  await expect(page.getByRole("link", { name: `Home` })).toBeVisible();
  for (let i = 0; i < 6; i++) {
    const item = page.getByText(`Item ${i + 1}`);
    await expect(item).toBeEnabled();
    await expect(item).toBeVisible();
  }

  // ASSERT
  await expect(page).toHaveScreenshot("truncated-more-list-opened-flyout.png");
});
