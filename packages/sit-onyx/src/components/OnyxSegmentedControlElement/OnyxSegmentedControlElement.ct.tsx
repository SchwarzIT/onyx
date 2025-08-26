import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots.jsx";
import OnyxSegmentedControlElement from "./OnyxSegmentedControlElement.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Segmented Control Element",
    columns: DENSITIES,
    rows: ["default", "icon", "labelAndIcon"],
    component: (column, row) => {
      return (
        <OnyxSegmentedControlElement
          name="option"
          label="Option"
          hideLabel={row === "icon"}
          icon={row === "icon" || row === "labelAndIcon" ? mockPlaywrightIcon : undefined}
          value="option"
          density={column}
        />
      );
    },
  });
});
