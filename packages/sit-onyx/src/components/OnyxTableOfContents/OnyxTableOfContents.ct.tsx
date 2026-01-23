import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
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
