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
      "withPersonalFilterButton",
    ],
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxSearch
        label="Step"
        disabled={column === "disabled"}
        color={column === "tinted" ? "tinted" : "blank"}
        cornerRadius={column === "strongCornerRadius" ? "strong" : "soft"}
        withShortcut={column === "withShortcut"}
        showFilter={
          column === "withFilterButton" || column === "withPersonalFilterButton" ? true : undefined
        }
        showPersonalFilter={column === "withPersonalFilterButton" ? true : undefined}
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
  let showFilter = false;
  let showPersonalFilter = false;

  const component = await mount(OnyxSearch, {
    props: {
      label: "Search",
      showFilter: showFilter,
      showPersonalFilter: showPersonalFilter,
    },
    on: {
      "update:showFilter": (value: boolean) => (showFilter = value),
      "update:showPersonalFilter": (value: boolean) => (showPersonalFilter = value),
    },
  });

  const personalFilterButton = component.getByRole("button", {
    name: "show personal search filter",
  });
  const filterButton = component.getByRole("button", { name: "show search filter" });

  await filterButton.click();
  expect(showFilter).toBe(true);

  await personalFilterButton.click();
  expect(showPersonalFilter).toBe(true);
});

test("should not render buttons when disabled", async ({ mount }) => {
  const component = await mount(OnyxSearch, {
    props: {
      label: "Search",
      showFilter: false,
      showPersonalFilter: false,
      disabled: true,
    },
  });

  const filterButton = component.getByRole("button", { name: "show search filter" });
  const personalFilterButton = component.getByRole("button", {
    name: "show personal search filter",
  });

  await expect(filterButton).toBeHidden();
  await expect(personalFilterButton).toBeHidden();
});
