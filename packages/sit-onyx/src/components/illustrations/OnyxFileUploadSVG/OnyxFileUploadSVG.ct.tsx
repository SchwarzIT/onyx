import { test } from "../../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../../playwright/screenshots.js";
import { illustrationScreenshotHooks } from "../playwright-utils.jsx";
import OnyxFileUploadSVG from "./OnyxFileUploadSVG.vue";

test.describe("Screenshot tests", () => {
  ["default", "error"].forEach((state) => {
    executeMatrixScreenshotTest({
      name: `File upload SVG (${state})`,
      columns: ["light", "dark"],
      rows: ["default", "disabled", "active"],
      component: (column, row) => (
        <OnyxFileUploadSVG
          disabled={row === "disabled"}
          active={row === "active"}
          error={state === "error"}
        />
      ),
      hooks: illustrationScreenshotHooks,
    });
  });
});
