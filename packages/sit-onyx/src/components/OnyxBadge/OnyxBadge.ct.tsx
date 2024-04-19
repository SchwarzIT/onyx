import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots";
import { ONYX_COLORS } from "../../types/colors";
import OnyxBadge from "./OnyxBadge.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: `Badge`,
    columns: DENSITIES,
    rows: ONYX_COLORS,
    component: (column, row) => (
      <OnyxBadge density={column} variation={row}>
        Badge
      </OnyxBadge>
    ),
    beforeScreenshot: async (component) => {
      await expect(component).toContainText("Badge");
    },
  });

  executeMatrixScreenshotTest({
    name: `Badge (with icon)`,
    columns: DENSITIES,
    rows: ONYX_COLORS,
    component: (column, row) => (
      <OnyxBadge density={column} variation={row} icon={mockPlaywrightIcon}>
        Badge
      </OnyxBadge>
    ),
    beforeScreenshot: async (component) => {
      await expect(component).not.toContainText("Badge");
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
