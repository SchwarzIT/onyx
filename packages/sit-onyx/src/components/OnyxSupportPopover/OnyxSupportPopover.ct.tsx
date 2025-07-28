import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import TestCase from "./TestCase.ct.vue";
import type { PopoverPosition } from "./types.js";

test.describe("Screenshot tests (top)", () => {
  executeMatrixScreenshotTest({
    name: "Support popover (top)",
    columns: ["default", "unsupported-popover-api"],
    rows: [
      "top left",
      "top center",
      "top right",
      "top span-left",
      "top span-x-end",
      "top span-all",
    ] satisfies PopoverPosition[],
    component: (column, row) => (
      <TestCase
        label="Label"
        position={row}
        open
        forceUnsupported={column === "unsupported-popover-api"}
      />
    ),
  });
});

test.describe("Screenshot tests (bottom)", () => {
  executeMatrixScreenshotTest({
    name: "Support popover (bottom)",
    columns: ["default", "unsupported-popover-api"],
    rows: [
      "bottom left",
      "bottom center",
      "bottom right",
      "bottom span-left",
      "bottom span-x-end",
      "bottom span-all",
    ] satisfies PopoverPosition[],
    component: (column, row) => (
      <TestCase
        label="Label"
        position={row}
        open
        forceUnsupported={column === "unsupported-popover-api"}
      />
    ),
  });
});

test.describe("Screenshot tests (left)", () => {
  executeMatrixScreenshotTest({
    name: "Support popover (left)",
    columns: ["default", "unsupported-popover-api"],
    rows: [
      "center left",
      "left span-top",
      "left span-bottom",
      "left span-all",
    ] satisfies PopoverPosition[],
    context: {
      disabledAccessibilityRules: ["scrollable-region-focusable"],
    },
    component: (column, row) => (
      <TestCase
        label="Label"
        position={row}
        open
        forceHeight
        forceUnsupported={column === "unsupported-popover-api"}
      />
    ),
  });
});

test.describe("Screenshot tests (right)", () => {
  executeMatrixScreenshotTest({
    name: "Support popover (right)",
    columns: ["default", "unsupported-popover-api"],
    rows: [
      "center right",
      "right span-top",
      "right span-bottom",
      "right span-all",
    ] satisfies PopoverPosition[],
    context: {
      disabledAccessibilityRules: ["scrollable-region-focusable"],
    },
    component: (column, row) => (
      <TestCase
        label="Label"
        position={row}
        open
        forceHeight
        forceUnsupported={column === "unsupported-popover-api"}
      />
    ),
  });
});
