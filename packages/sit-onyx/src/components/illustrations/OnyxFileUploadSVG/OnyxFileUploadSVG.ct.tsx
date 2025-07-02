import { test } from "../../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../../playwright/screenshots.js";
import { illustrationScreenshotHooks } from "../playwright-utils";
import OnyxFileUploadSVG from "./OnyxFileUploadSVG.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "File upload SVG",
    columns: ["light", "dark"],
    rows: ["default", "disabled", "active"],
    component: (column, row) => (
      <OnyxFileUploadSVG disabled={row === "disabled"} active={row === "active"} />
    ),
    hooks: illustrationScreenshotHooks,
  });
});
