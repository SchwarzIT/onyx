import { iconPlaceholder } from "@sit-onyx/icons";
import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxNavButton from "./OnyxNavButton.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Nav button",
    columns: ["button", "link"],
    rows: ["default", "hover", "focus-visible", "active"],
    component: (column) => (
      <OnyxNavButton
        label="Nav button"
        icon={iconPlaceholder}
        link={column === "link" ? "#example" : undefined}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await useFocusStateHooks({ component, page, state: row });
      },
    },
  });
});

test.describe("Screenshot tests (primary)", () => {
  executeMatrixScreenshotTest({
    name: "Nav button (icon)",
    columns: ["button", "link"],
    rows: ["default", "hover", "focus-visible", "active"],
    component: (column) => (
      <OnyxNavButton
        label="Nav button"
        icon={iconPlaceholder}
        link={column === "link" ? "#example" : undefined}
        hideLabel
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await useFocusStateHooks({ component, page, state: row });
      },
    },
  });
});

test.describe("Screenshot tests (icon)", () => {
  executeMatrixScreenshotTest({
    name: "Nav button (icon)",
    columns: ["neutral", "primary"],
    rows: ["default", "hover", "focus-visible", "active"],
    component: (column) => (
      <OnyxNavButton color={column} label="Nav button" icon={iconPlaceholder} hideLabel />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await useFocusStateHooks({ component, page, state: row });
      },
    },
  });
});

test.describe("Screenshot tests (disabled)", () => {
  executeMatrixScreenshotTest({
    name: "Nav button (disabled)",
    columns: ["neutral", "primary"],
    rows: ["default", "hover", "focus-visible", "active"],
    component: (column) => (
      <OnyxNavButton color={column} label="Nav button" icon={iconPlaceholder} disabled />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await useFocusStateHooks({ component, page, state: row });
      },
    },
  });
});

test("should render link", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(<OnyxNavButton label="Test label" link="#example" />);

  // ASSERT
  await expect(component).toHaveRole("link");
  await expect(component).toHaveAttribute("href", "#example");

  // ACT
  await component.click();

  // ASSERT
  await expect(page).toHaveURL(/\/#example/);
});
