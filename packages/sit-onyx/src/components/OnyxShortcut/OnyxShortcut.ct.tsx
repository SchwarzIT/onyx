import { createEmitSpy, expectEmit } from "@sit-onyx/playwright-utils";
import { OPERATING_SYSTEMS } from "../../composables/useOperatingSystem.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxShortcut from "./OnyxShortcut.vue";
import type { ShortcutSequenceStep } from "./types.js";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Shortcut",
    columns: ["default"],
    rows: ["all", "any", "mixed", "hideSeparator", "skeleton"],
    component: (column, row) => {
      const sequences: Record<typeof row, ShortcutSequenceStep[]> = {
        all: [{ all: ["Control", "C"] }],
        any: [{ any: ["A", "B"] }],
        mixed: [{ all: ["A", "B"] }, { any: ["C", "D"] }],
        hideSeparator: [{ any: ["A", "B"], hideSeparator: true }],
        skeleton: [],
      };

      return <OnyxShortcut sequence={sequences[row]} skeleton={row === "skeleton"} />;
    },
  });
});

test.describe("Screenshot tests (highlight)", () => {
  executeMatrixScreenshotTest({
    name: "Shortcut (highlight)",
    columns: ["default"],
    rows: ["default"],
    component: () => <OnyxShortcut sequence={[{ any: ["A", "B", "C", "D"] }]} highlight />,
    hooks: {
      beforeEach: async (component, page) => {
        await page.keyboard.down("A");
        await page.keyboard.down("C");
      },
    },
  });
});

test.describe("Screenshot tests (OS)", () => {
  executeMatrixScreenshotTest({
    name: "Shortcut (OS)",
    columns: OPERATING_SYSTEMS,
    rows: ["Meta"],
    component: (column, row) => <OnyxShortcut sequence={[{ all: [row, "S"] }]} os={column} />,
  });
});

// eslint-disable-next-line playwright/expect-expect -- assertion is done by "expectEmit"
test("should emit events when step and full sequence is completed", async ({ mount, page }) => {
  // ARRANGE
  const onComplete = createEmitSpy<typeof OnyxShortcut, "onComplete">();
  const onStepComplete = createEmitSpy<typeof OnyxShortcut, "onStepComplete">();
  await mount(
    <OnyxShortcut
      sequence={[{ all: ["Control", "C"] }, { any: ["V"] }]}
      onComplete={onComplete}
      onStepComplete={onStepComplete}
    />,
  );

  // ACT
  await page.keyboard.down("Control");
  await page.keyboard.press("c");
  await page.keyboard.up("Control");

  // ASSERT
  expectEmit(onStepComplete, 1, [{ all: ["Control", "C"] }, 0]);
  expectEmit(onComplete, 0);

  // ACT
  await page.keyboard.press("v");

  // ASSERT
  expectEmit(onStepComplete, 2, [{ any: ["V"] }, 1]);
  expectEmit(onComplete, 1, []);
});
