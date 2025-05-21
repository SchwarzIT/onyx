import { test } from "../../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../../playwright/screenshots";
import { illustrationScreenshotHooks } from "../playwright-utils";
import OnyxFileUploadSVG from "./OnyxFileUploadSVG.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "File upload SVG",
    columns: ["light", "dark"],
    rows: ["default", "disabled"],
    component: (column, row) => <OnyxFileUploadSVG disabled={row === "disabled"} />,
    hooks: illustrationScreenshotHooks,
  });
});
