import { test } from "../../../playwright/a11y.js";
import {
  executeMatrixScreenshotTest,
  illustrationScreenshotHooks,
} from "../../../playwright/screenshots.js";
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
