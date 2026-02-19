import { DENSITIES } from "sit-onyx";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxTextEditor from "./OnyxTextEditor.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Text editor",
    columns: DENSITIES,
    rows: ["default"],
    context: {
      // TODO: fix this
      disabledAccessibilityRules: ["aria-allowed-attr", "aria-prohibited-attr"],
    },
    component: (column) => <OnyxTextEditor density={column} label="Text editor" />,
  });
});
