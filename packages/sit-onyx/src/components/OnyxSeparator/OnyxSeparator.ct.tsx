import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxSeparator from "./OnyxSeparator.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Separator",
    columns: ["default"],
    rows: ["default"],
    component: () => <OnyxSeparator />,
  });
});
