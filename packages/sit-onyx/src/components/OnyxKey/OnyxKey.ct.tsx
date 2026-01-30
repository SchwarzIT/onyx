import { createEmitSpy, expectEmit } from "@sit-onyx/playwright-utils";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import { OPERATING_SYSTEMS } from "../../types/index.js";
import OnyxKey from "./OnyxKey.vue";
import {
  ALPHABETIC_KEYS,
  FUNCTION_KEYS,
  MEDIA_KEYS,
  MISC_KEYS,
  MODIFIER_KEYS,
  NAVIGATION_KEYS,
  NUMERIC_KEYS,
  NUMPAD_KEYS,
  SYMBOL_KEYS,
} from "./types.js";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Key",
    columns: ["default"],
    rows: ["default", "highlighted", "skeleton"],
    component: (column, row) => (
      <OnyxKey name="A" highlighted={row === "highlighted"} skeleton={row === "skeleton"} />
    ),
  });
});

test.describe("Screenshot tests (alphabetic)", () => {
  executeMatrixScreenshotTest({
    name: "Key (alphabetic)",
    columns: OPERATING_SYSTEMS,
    rows: ALPHABETIC_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (numeric)", () => {
  executeMatrixScreenshotTest({
    name: "Key (numeric)",
    columns: OPERATING_SYSTEMS,
    rows: NUMERIC_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (modifier)", () => {
  executeMatrixScreenshotTest({
    name: "Key (modifier)",
    columns: OPERATING_SYSTEMS,
    rows: MODIFIER_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (navigation)", () => {
  executeMatrixScreenshotTest({
    name: "Key (navigation)",
    columns: OPERATING_SYSTEMS,
    rows: NAVIGATION_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (functional)", () => {
  executeMatrixScreenshotTest({
    name: "Key (functional)",
    columns: OPERATING_SYSTEMS,
    rows: FUNCTION_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (misc)", () => {
  executeMatrixScreenshotTest({
    name: "Key (misc)",
    columns: OPERATING_SYSTEMS,
    rows: MISC_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (media)", () => {
  executeMatrixScreenshotTest({
    name: "Key (media)",
    columns: OPERATING_SYSTEMS,
    rows: MEDIA_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (numpad)", () => {
  executeMatrixScreenshotTest({
    name: "Key (numpad)",
    columns: OPERATING_SYSTEMS,
    rows: NUMPAD_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (symbol)", () => {
  executeMatrixScreenshotTest({
    name: "Key (symbol)",
    columns: OPERATING_SYSTEMS,
    rows: SYMBOL_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

// eslint-disable-next-line playwright/expect-expect -- assertion done by "expectEmit"
test("should emit event when the matching key is pressed", async ({ mount, page }) => {
  // ARRANGE
  const onPressed = createEmitSpy<typeof OnyxKey, "onPressed">();
  await mount(<OnyxKey name="Enter" onPressed={onPressed} />);

  // ACT
  await page.keyboard.press("A");

  // ASSERT
  expectEmit(onPressed, 0);

  // ACT
  await page.keyboard.press("Enter");

  // ASSERT
  expectEmit(onPressed, 1, []);
});
