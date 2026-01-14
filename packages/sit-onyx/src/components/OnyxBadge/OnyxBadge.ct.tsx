import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots.js";
import { ONYX_COLORS } from "../../types/colors.js";
import OnyxBadge from "./OnyxBadge.vue";
import TestCase from "./TestCase.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: `Badge`,
    columns: DENSITIES,
    rows: ONYX_COLORS,
    component: (column, row) => (
      <OnyxBadge density={column} color={row}>
        Badge
      </OnyxBadge>
    ),
    hooks: {
      beforeEach: async (component) => {
        await expect(component).toContainText("Badge");
      },
    },
  });

  executeMatrixScreenshotTest({
    name: `Badge (with icon)`,
    columns: DENSITIES,
    rows: ONYX_COLORS,
    component: (column, row) => (
      <OnyxBadge density={column} color={row} icon={mockPlaywrightIcon}>
        Badge
      </OnyxBadge>
    ),
    hooks: {
      beforeEach: async (component) => {
        await expect(component).not.toContainText("Badge");
      },
    },
  });

  // we still add an icon and text here to test that they are not displayed in dot mode
  executeMatrixScreenshotTest({
    name: `Badge (dot)`,
    columns: DENSITIES,
    rows: ONYX_COLORS,
    component: (column, row) => (
      <OnyxBadge density={column} color={row} icon={mockPlaywrightIcon} dot>
        Badge
      </OnyxBadge>
    ),
    hooks: {
      beforeEach: async (component) => {
        await expect(component).not.toContainText("Badge");
        await expect(component.locator(".onyx-badge__icon")).not.toBeAttached();
      },
    },
  });
  executeMatrixScreenshotTest({
    name: `Badge (alignment)`,
    columns: ["default"],
    rows: ["start", "center", "end"],
    component: (column, row) => <TestCase alignItems={row} />,
  });
  executeMatrixScreenshotTest({
    name: `Badge (selected)`,
    columns: ONYX_COLORS,
    rows: ["default", "hover", "focus-visible", "selected"],
    component: (column, row) => (
      <OnyxBadge
        color={column}
        clickable={{ label: "Test", selected: row === "selected" }}
        style={{ marginBottom: row === "focus-visible" ? "2rem" : "0" }}
      >
        Badge
      </OnyxBadge>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await useFocusStateHooks({ page, component, state: row });
      },
    },
  });
});

test("should truncate text", async ({ mount }) => {
  const label = "Very long label that should be truncated";

  // ARRANGE
  const component = await mount(<OnyxBadge style={{ width: "12rem" }}>{label}</OnyxBadge>);

  // ASSERT
  await expect(component).toContainText(label);

  // ASSERT
  await expect(component).toHaveScreenshot("truncation-ellipsis.png");
});

test("should render clickable badge", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<OnyxBadge clickable="clickable">Badge</OnyxBadge>);
  const badge = component.getByRole("button", { name: "Badge" });

  // ASSERT
  await expect(badge).toBeEnabled();
});

test("should render selected-interactive Badge with clickable prop and selectProps", async ({
  mount,
}) => {
  // ARRANGE
  const component = await mount(
    <OnyxBadge clickable={{ label: "Badge", selected: true }}>Badge</OnyxBadge>,
  );
  const badge = component.getByRole("button", { name: "Badge" });

  // ASSERT
  await expect(badge).toHaveAttribute("aria-pressed", "true");
});
