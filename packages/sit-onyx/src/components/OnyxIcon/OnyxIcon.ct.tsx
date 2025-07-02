import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots.js";
import { ONYX_COLORS } from "../../types/colors.js";
import OnyxIcon from "./OnyxIcon.vue";
import { ICON_SIZES } from "./types.js";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Icon",
    columns: ONYX_COLORS,
    rows: ICON_SIZES,
    component: (column, row) => <OnyxIcon icon={mockPlaywrightIcon} size={row} color={column} />,
  });
});
