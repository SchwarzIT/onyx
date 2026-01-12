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

test("should render interactive Badge with clickable prop", async ({ mount }) => {
  const component = await mount(<OnyxBadge clickable="clickable">Badge</OnyxBadge>);
  const interactiveTag = component.getByRole("button", { name: "Badge" });
  await expect(interactiveTag).toContainClass("onyx-badge--interactive");
});
test("should render selected-interactive Badge with clickable prop and selectProps", async ({
  mount,
}) => {
  const component = await mount(
    <OnyxBadge clickable="clickable" selected>
      Badge
    </OnyxBadge>,
  );
  const badge = component.getByRole("button", { name: "Badge" });

  await expect(badge).toContainClass("onyx-badge--selected");
  await expect(badge).toHaveAttribute("aria-pressed", "true");
});

test("should render selected non-interactive Badge", async ({ mount }) => {
  const component = await mount(<OnyxBadge selected>Badge</OnyxBadge>);
  const badge = component.getByText("Badge");

  await expect(badge).toContainClass("onyx-badge--selected");

  const tagName = await badge.evaluate((el) => el.tagName.toLowerCase());
  expect(tagName).toBe("div");
  await expect(badge).not.toHaveAttribute("aria-pressed", "true");
});
