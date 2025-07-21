import { test } from "../../../playwright/a11y.js";
import {
  executeMatrixScreenshotTest,
  illustrationScreenshotHooks,
} from "../../../playwright/screenshots.js";
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
