import { test } from "../../playwright-axe";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { ONYX_COLORS } from "../../types/colors";
import { mockPlaywrightIcon } from "../../utils/playwright";
import OnyxIcon from "./OnyxIcon.vue";
import { ICON_SIZES } from "./types";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Icon",
    columns: ONYX_COLORS,
    rows: ICON_SIZES,
    component: (column, row) => <OnyxIcon icon={mockPlaywrightIcon} size={row} color={column} />,
  });
});
