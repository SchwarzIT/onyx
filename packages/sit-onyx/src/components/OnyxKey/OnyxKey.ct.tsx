import type { MatrixScreenshotTestOptions } from "@sit-onyx/playwright-utils";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
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

const screenshotOptions = {
  rows: ["default", "pressed"] as const,
} satisfies Partial<MatrixScreenshotTestOptions>;

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (misc keys)",
    columns: MISC_KEYS,
    component: (column, row) => (
      <OnyxKey keyName={column} highlighted={row === "pressed"} style={{ margin: "0.25rem" }} />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (media keys)",
    columns: MEDIA_KEYS,
    component: (column, row) => (
      <OnyxKey keyName={column} highlighted={row === "pressed"} style={{ margin: "0.25rem" }} />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (numpad keys)",
    columns: NUMPAD_KEYS,
    component: (column, row) => (
      <OnyxKey keyName={column} highlighted={row === "pressed"} style={{ margin: "0.25rem" }} />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (symbol keys)",
    columns: SYMBOL_KEYS,
    component: (column, row) => (
      <OnyxKey keyName={column} highlighted={row === "pressed"} style={{ margin: "0.25rem" }} />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (numeric keys)",
    columns: NUMERIC_KEYS,
    component: (column, row) => (
      <OnyxKey keyName={column} highlighted={row === "pressed"} style={{ margin: "0.25rem" }} />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (functional keys)",
    columns: FUNCTION_KEYS,
    component: (column, row) => (
      <OnyxKey keyName={column} highlighted={row === "pressed"} style={{ margin: "0.25rem" }} />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (modifier keys)",
    columns: MODIFIER_KEYS,
    component: (column, row) => (
      <OnyxKey keyName={column} highlighted={row === "pressed"} style={{ margin: "0.25rem" }} />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (navigation keys)",
    columns: NAVIGATION_KEYS,
    component: (column, row) => (
      <OnyxKey keyName={column} highlighted={row === "pressed"} style={{ margin: "0.25rem" }} />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (alphabetic keys)",
    columns: ALPHABETIC_KEYS,
    component: (column, row) => (
      <OnyxKey keyName={column} highlighted={row === "pressed"} style={{ margin: "0.25rem" }} />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (skeleton)",
    rows: ["skeleton"] as const,
    columns: ["skeleton"] as const,
    component: () => <OnyxKey keyName="Enter" skeleton style={{ margin: "0.25rem" }} />,
  });
});

test.describe("Interaction tests", () => {
  test("should show OS-specific symbols for keys", async ({ mount }) => {
    // ARRANGE - macOS
    const macComponent = await mount(<OnyxKey keyName="Meta" os="macOS" />);

    // ASSERT - Should show command symbol
    await expect(macComponent).toContainText("⌘");

    // ARRANGE - Windows
    const winComponent = await mount(<OnyxKey keyName="Meta" os="windows" />);

    // ASSERT - Should show Windows symbol
    await expect(winComponent).toContainText("⊞");
  });

  test("should emit pressMatch event when the matching key is pressed", async ({ mount, page }) => {
    // ARRANGE
    let isPressMatchEmitted = false;
    await mount(OnyxKey, {
      props: {
        keyName: "Enter",
      },
      on: {
        pressMatch: () => {
          isPressMatchEmitted = true;
        },
      },
    });

    // ACT
    await page.keyboard.press("Enter");

    // ASSERT
    expect(isPressMatchEmitted).toBeTruthy();
  });

  test("should not emit pressMatch event when a different key is pressed", async ({
    mount,
    page,
  }) => {
    // ARRANGE
    let isPressMatchEmitted = false;
    await mount(OnyxKey, {
      props: {
        keyName: "Enter",
      },
      on: {
        pressMatch: () => {
          isPressMatchEmitted = true;
        },
      },
    });

    // ACT
    await page.keyboard.press("Escape");

    // ASSERT
    expect(isPressMatchEmitted).toBeFalsy();
  });
});
