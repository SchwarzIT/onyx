import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxAppLayout from "../OnyxAppLayout/OnyxAppLayout.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxPageLayout from "../OnyxPageLayout/OnyxPageLayout.vue";
import OnyxTableOfContentsItem from "../OnyxTableOfContentsItem/OnyxTableOfContentsItem.vue";
import OnyxTableOfContents from "./OnyxTableOfContents.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Table of contents",
    columns: ["default", "hover", "focus-visible"],
    rows: ["default", "active", "child-active"],
    component: (column, row) => (
      <OnyxTableOfContents>
        <OnyxTableOfContentsItem link="#item-1" active={row === "active"}>
          Item 1
        </OnyxTableOfContentsItem>

        <OnyxTableOfContentsItem link="#item-2">
          Item 2
          <template v-slot:children>
            <OnyxTableOfContentsItem link="#child-1" active={row === "child-active"}>
              Child 1
            </OnyxTableOfContentsItem>
            <OnyxTableOfContentsItem link="#child-2">Child 2</OnyxTableOfContentsItem>
          </template>
        </OnyxTableOfContentsItem>

        <OnyxTableOfContentsItem link="#item-3">Item 3</OnyxTableOfContentsItem>
      </OnyxTableOfContents>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const item = component.getByText(row.includes("child") ? "Child 1" : "Item 1");
        await useFocusStateHooks({ component: item, page, state: column });

        if (row === "child-active" && column === "focus-visible") {
          await page.keyboard.press("Tab");
          await page.keyboard.press("Tab");
        }
      },
    },
  });
});

test.describe("Screenshot tests (truncated)", () => {
  executeMatrixScreenshotTest({
    name: "Table of contents (truncated)",
    columns: ["default"],
    rows: ["width", "height"],
    component: (column, row) => (
      <OnyxTableOfContents
        style={{
          width: row === "width" ? "6rem" : undefined,
          height: row === "height" ? "8rem" : undefined,
        }}
      >
        <OnyxTableOfContentsItem link="#item-1">Very long item 1</OnyxTableOfContentsItem>

        <OnyxTableOfContentsItem link="#item-2">
          Very long item 2
          <template v-slot:children>
            <OnyxTableOfContentsItem link="#child-1">Very long child 1</OnyxTableOfContentsItem>
          </template>
        </OnyxTableOfContentsItem>

        <OnyxTableOfContentsItem link="#item-3">Very long item 3</OnyxTableOfContentsItem>
        <OnyxTableOfContentsItem link="#item-4">Very long item 4</OnyxTableOfContentsItem>
        <OnyxTableOfContentsItem link="#item-5">Very long item 5</OnyxTableOfContentsItem>
      </OnyxTableOfContents>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        if (row === "height") {
          await component.getByText("item 5").scrollIntoViewIfNeeded();
        }
      },
    },
  });
});

test.describe("Screenshot tests (densities)", () => {
  executeMatrixScreenshotTest({
    name: "Table of contents (densities)",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible", "skeleton"],
    component: (column, row) => (
      <OnyxTableOfContents density={column} skeleton={row === "skeleton"}>
        <OnyxTableOfContentsItem link="#item-1">Item 1</OnyxTableOfContentsItem>

        <OnyxTableOfContentsItem link="#item-2">
          Item 2
          <template v-slot:children>
            <OnyxTableOfContentsItem link="#child-1" active>
              Child 1
            </OnyxTableOfContentsItem>
            <OnyxTableOfContentsItem link="#child-2">Child 2</OnyxTableOfContentsItem>
          </template>
        </OnyxTableOfContentsItem>

        <OnyxTableOfContentsItem link="#item-3">Item 3</OnyxTableOfContentsItem>
      </OnyxTableOfContents>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const item = component.getByText("Child 1");
        await useFocusStateHooks({ component: item, page, state: row });

        if (row === "focus-visible") {
          await page.keyboard.press("Tab");
          await page.keyboard.press("Tab");
        }
      },
    },
  });
});

test("should auto activate items on scroll", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxAppLayout>
      <OnyxPageLayout>
        <template v-slot:sidebarRight>
          <OnyxTableOfContents>
            <OnyxTableOfContentsItem link="#1">Item 1</OnyxTableOfContentsItem>
            <OnyxTableOfContentsItem link="#2">Item 2</OnyxTableOfContentsItem>
            <OnyxTableOfContentsItem link="#4">Item 4</OnyxTableOfContentsItem>
            <OnyxTableOfContentsItem link="#5">Item 5</OnyxTableOfContentsItem>
            <OnyxTableOfContentsItem link="#6">Item 6</OnyxTableOfContentsItem>
          </OnyxTableOfContents>
        </template>

        <div style={{ height: "110dvh" }}>
          <OnyxHeadline is="h2" hash="1">
            Section 1
          </OnyxHeadline>
        </div>

        <div style={{ height: "110dvh" }}>
          <OnyxHeadline is="h2" hash="2">
            Section 2
          </OnyxHeadline>
        </div>

        <div style={{ height: "20dvh" }}>
          <OnyxHeadline is="h2" hash="3">
            Section 3
          </OnyxHeadline>
        </div>

        <div style={{ height: "20dvh" }}>
          <OnyxHeadline is="h2" hash="4">
            Section 4
          </OnyxHeadline>
        </div>

        <div style={{ height: "210dvh" }}>
          <OnyxHeadline is="h2" hash="5">
            Section 5
          </OnyxHeadline>
        </div>

        <div style={{ height: "210dvh" }}>
          <OnyxHeadline is="h2" hash="6">
            Section 6
          </OnyxHeadline>
        </div>
      </OnyxPageLayout>
    </OnyxAppLayout>,
  );

  // ASSERT
  const activeClass = "onyx-router-link--active";

  await expect(component.getByRole("heading", { name: "Section 1" })).toBeInViewport();
  await expect(component.getByRole("link", { name: "Item 1" })).toContainClass(activeClass);

  // ACT
  await component.getByRole("heading", { name: "Section 2" }).scrollIntoViewIfNeeded();

  // ASSERT
  await expect(
    component.getByRole("link", { name: "Item 2" }),
    "should activate TOC item when it becomes visible",
  ).toContainClass(activeClass);

  // ACT
  await component.getByRole("heading", { name: "Section 4" }).scrollIntoViewIfNeeded();

  // ASSERT
  await expect(component.getByRole("heading", { name: "Section 3" })).toBeInViewport();
  await expect(component.getByRole("heading", { name: "Section 4" })).toBeInViewport();
  await expect(component.getByRole("heading", { name: "Section 5" })).toBeInViewport();

  await expect(
    component.getByRole("link", { name: "Item 4" }),
    "should activate first item if multiple are visible and ignore headlines that are not in the TOC",
  ).toContainClass(activeClass);
  await expect(
    component.getByRole("link", { name: "Item 5" }),
    "should not activate second item if multiple are visible",
  ).not.toContainClass(activeClass);

  // ACT
  await component.getByRole("heading", { name: "Section 5" }).scrollIntoViewIfNeeded();
  await component.locator(".onyx-page__main").evaluate((scrollContainer) => {
    scrollContainer.scrollBy({ top: 1000 });
  });

  // ASSERT
  await expect(component.getByRole("heading", { name: "Section 5" })).not.toBeInViewport();
  await expect(component.getByRole("heading", { name: "Section 6" })).not.toBeInViewport();

  await expect(
    component.getByRole("link", { name: "Item 5" }),
    "should keep previous item active if scrolled beyond but next item is not visible yet",
  ).toContainClass(activeClass);

  // ACT
  await component.getByRole("heading", { name: "Section 6" }).scrollIntoViewIfNeeded();

  // ASSERT
  await expect(component.getByRole("link", { name: "Item 5" })).not.toContainClass(activeClass);
  await expect(component.getByRole("link", { name: "Item 6" })).toContainClass(activeClass);

  // ACT
  await component.getByRole("heading", { name: "Section 2" }).scrollIntoViewIfNeeded();

  // ASSERT
  await expect(component.getByRole("link", { name: "Item 2" })).toContainClass(activeClass);
  await expect(component.getByRole("link", { name: "Item 6" })).not.toContainClass(activeClass);
});
