import {
  createEmitSpy,
  expectEmit,
  type MatrixScreenshotTestOptions,
} from "@sit-onyx/playwright-utils";
import { OPERATING_SYSTEMS } from "../../composables/useOperatingSystem.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxKey from "./OnyxKey.vue";
import {
  ALPHABETIC_KEYS,
  EDITING_KEYS,
  FUNCTION_KEYS,
  MEDIA_KEYS,
  MISC_KEYS,
  MODIFIER_KEYS,
  NAVIGATION_KEYS,
  NUMERIC_KEYS,
  NUMPAD_KEYS,
  SYMBOL_KEYS,
} from "./types.js";

const screenshotOptions = {
  columns: OPERATING_SYSTEMS,
  removePadding: true,
} satisfies Partial<MatrixScreenshotTestOptions>;

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Key",
    columns: ["default"],
    rows: ["default", "highlighted", "truncated", "skeleton"],
    component: (column, row) => (
      <OnyxKey
        name={row === "truncated" ? "ScrollLock" : "A"}
        highlighted={row === "highlighted"}
        skeleton={row === "skeleton"}
        style={{ width: row === "truncated" ? "6rem" : 0 }}
      />
    ),
  });
});

test.describe("Screenshot tests (alphabetic)", () => {
  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (alphabetic)",
    rows: ALPHABETIC_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (numeric)", () => {
  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (numeric)",
    rows: NUMERIC_KEYS,
    removePadding: true,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (modifier)", () => {
  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (modifier)",
    rows: MODIFIER_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (navigation)", () => {
  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (navigation)",
    rows: NAVIGATION_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (functional)", () => {
  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (functional)",
    rows: FUNCTION_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (misc)", () => {
  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (misc)",
    rows: MISC_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (media)", () => {
  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (media)",
    rows: MEDIA_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (numpad)", () => {
  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (numpad)",
    rows: NUMPAD_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (symbol)", () => {
  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (symbol)",
    rows: SYMBOL_KEYS,
    component: (column, row) => <OnyxKey name={row} os={column} />,
  });
});

test.describe("Screenshot tests (editing)", () => {
  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (editing)",
    rows: EDITING_KEYS,
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
