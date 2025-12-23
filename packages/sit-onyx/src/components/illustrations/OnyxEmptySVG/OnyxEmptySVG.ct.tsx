import { test } from "../../../playwright/a11y.js";
import {
  executeMatrixScreenshotTest,
  illustrationScreenshotHooks,
} from "../../../playwright/screenshots.js";
import OnyxEmptySVG from "./OnyxEmptySVG.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Empty SVG",
    columns: ["light", "dark"],
    rows: ["default"],
    component: () => <OnyxEmptySVG style={{ width: "24rem" }} />,
    hooks: illustrationScreenshotHooks,
  });
});
