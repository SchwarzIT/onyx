import { test } from "../../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../../playwright/screenshots";
import { illustrationScreenshotHooks } from "../playwright-utils";
import OnyxErrorSVG from "./OnyxErrorSVG.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Error SVG",
    columns: ["light", "dark"],
    rows: ["default"],
    component: () => <OnyxErrorSVG style={{ width: "24rem" }} />,
    hooks: illustrationScreenshotHooks,
  });
});
