import { DENSITIES } from "../../composables/density";
import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { ORIENTATIONS } from "../../types";
import OnyxProgressSteps from "./OnyxProgressSteps.vue";
import type { ControlledProgressStep } from "./types";

const STEPS: ControlledProgressStep[] = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Step 3" },
  { label: "Step 4" },
];

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Progress steps",
    columns: ORIENTATIONS,
    rows: DENSITIES,
    component: (column, row) => (
      <OnyxProgressSteps steps={STEPS} density={row} modelValue={3} orientation={column} />
    ),
  });
});
