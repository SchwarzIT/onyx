import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.jsx";
import OnyxSearch from "./OnyxSearch.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Search",
    columns: [
      "default",
      "tinted",
      "strongCornerRadius",
      "disabled",
      "withShortcut",
      "withFilterButton",
    ],
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxSearch
        label="Step"
        disabled={column === "disabled"}
        color={column === "tinted" ? "tinted" : "blank"}
        cornerRadius={column === "strongCornerRadius" ? "strong" : "soft"}
        withShortcut={column === "withShortcut"}
        showFilters={column === "withFilterButton" ? true : undefined}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});

test("should toggle filter values when buttons are clicked", async ({ mount }) => {
  let showFilters = false;

  const component = await mount(OnyxSearch, {
    props: {
      label: "Search",
      showFilters: showFilters,
    },
    on: {
      "update:showFilters": (value: boolean) => (showFilters = value),
    },
  });

  const filterButton = component.getByRole("button", { name: "show search filter" });

  await filterButton.click();
  expect(showFilters).toBe(true);
});

test("should not render buttons when disabled", async ({ mount }) => {
  const component = await mount(OnyxSearch, {
    props: {
      label: "Search",
      showFilters: false,
      disabled: true,
    },
  });

  const filterButton = component.getByRole("button", { name: "show search filter" });

  await expect(filterButton).toBeHidden();
});
