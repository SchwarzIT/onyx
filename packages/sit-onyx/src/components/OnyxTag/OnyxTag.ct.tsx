import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots";
import { ONYX_COLORS } from "../../types/colors";
import OnyxTag from "./OnyxTag.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Tag",
    columns: DENSITIES,
    rows: ONYX_COLORS,
    component: (column, row) => <OnyxTag label="Tag" density={column} color={row} />,
  });

  executeMatrixScreenshotTest({
    name: "Tag (with icon)",
    columns: DENSITIES,
    rows: ONYX_COLORS,
    component: (column, row) => (
      <OnyxTag label="Tag" density={column} color={row} icon={mockPlaywrightIcon} />
    ),
  });
});

test("should truncate text", async ({ mount }) => {
  const label = "Very long label that should be truncated";

  // ARRANGE
  const component = await mount(<OnyxTag label={label} style="max-width: 8rem;" />);

  // ASSERT
  await expect(component).toContainText(label);

  // ASSERT
  await expect(component).toHaveScreenshot("truncation.png");
});
