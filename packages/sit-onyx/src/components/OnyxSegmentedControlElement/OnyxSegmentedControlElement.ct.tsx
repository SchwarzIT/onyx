import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots.jsx";
import OnyxSegmentedControlElement from "./OnyxSegmentedControlElement.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Segmented Control Element",
    columns: DENSITIES,
    rows: ["label", "icon", "labelAndIcon", "disabled"],
    component: (column, row) => {
      return (
        <OnyxSegmentedControlElement
          value="option"
          label={row === "label" || row === "labelAndIcon" ? "Option" : undefined}
          icon={row === "icon" || row === "labelAndIcon" ? mockPlaywrightIcon : undefined}
          density={column}
          disabled={row === "disabled"}
        />
      );
    },
  });
});
