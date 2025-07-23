import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxFileTypeIcon from "./OnyxFileTypeIcon.vue";
import { SUPPORTED_FILE_TYPE_ICON_MEDIA_TYPES } from "./types.js";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "File type icon",
    columns: ["default"],
    rows: SUPPORTED_FILE_TYPE_ICON_MEDIA_TYPES,
    component: (column, row) => <OnyxFileTypeIcon type={row} />,
  });
});
