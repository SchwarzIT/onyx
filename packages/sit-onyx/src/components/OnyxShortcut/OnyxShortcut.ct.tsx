import type { MatrixScreenshotTestOptions } from "@sit-onyx/playwright-utils";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import type { KeyboardKey } from "../OnyxKey/types.js";
import OnyxShortcut from "./OnyxShortcut.vue";

const simpleKeys = ["Control", "C"] satisfies KeyboardKey[];
const complexKeys = ["Control", "Shift", "Alt", "C"] satisfies KeyboardKey[];

const screenshotOptions = {
  rows: ["default", "highlighted"] as const,
  hooks: {
    beforeEach: async (_component, page, column, row) => {
      if (row === "highlighted") {
        if (column === "simple") {
          simpleKeys.forEach(async (key) => {
            await page.keyboard.down(key);
          });
        } else {
          complexKeys.forEach(async (key) => {
            await page.keyboard.down(key);
          });
        }
      }
    },
  },
} satisfies Partial<MatrixScreenshotTestOptions>;

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Shortcut (single step - all)",
    columns: ["simple", "complex"],
    component: (column, row) => (
      <OnyxShortcut
        sequence={column === "simple" ? [{ all: simpleKeys }] : [{ all: complexKeys }]}
        highlightWhenPressed={row === "highlighted"}
        style={{ margin: "0.5rem" }}
      />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Shortcut (single step - any)",
    columns: ["simple", "complex"],
    component: (column, row) => (
      <OnyxShortcut
        sequence={column === "simple" ? [{ any: simpleKeys }] : [{ any: complexKeys }]}
        highlightWhenPressed={row === "highlighted"}
        style={{ margin: "0.5rem" }}
      />
    ),
  });

  executeMatrixScreenshotTest({
    rows: ["default"] as const,
    name: "Shortcut (multi-step sequence)",
    columns: ["simple", "complex"],
    component: (column) => (
      <OnyxShortcut
        sequence={
          column === "simple"
            ? [{ all: ["Control", "C"] }, { any: ["V", "Insert"] }]
            : [{ all: ["Control", "Shift"] }, { any: ["ArrowUp", "ArrowDown"] }, { all: ["Enter"] }]
        }
        style={{ margin: "0.5rem" }}
      />
    ),
  });

  executeMatrixScreenshotTest({
    name: "Shortcut (OS variants)",
    columns: ["macOS", "windows", "generic"],
    rows: ["modifier-keys", "mixed-keys"],
    component: (column, row) => (
      <OnyxShortcut
        sequence={
          row === "modifier-keys"
            ? [{ all: ["Meta", "Shift", "C"] }]
            : [{ all: ["Control", "F"] }, { any: ["1", "2", "3"] }]
        }
        variant={column}
        style={{ margin: "0.5rem" }}
      />
    ),
  });

  executeMatrixScreenshotTest({
    name: "Shortcut (skeleton)",
    columns: ["default"],
    rows: ["skeleton"],
    component: () => (
      <OnyxShortcut sequence={[{ all: ["Control", "C"] }]} skeleton style={{ margin: "0.5rem" }} />
    ),
  });

  executeMatrixScreenshotTest({
    name: "Shortcut (separators)",
    columns: ["all-separator", "any-separator", "sequence-separator"],
    rows: ["default"],
    component: (column) => {
      if (column === "all-separator") {
        return (
          <OnyxShortcut
            sequence={[{ all: ["Control", "Shift", "Alt", "Delete"] }]}
            style={{ margin: "0.5rem" }}
          />
        );
      }
      if (column === "any-separator") {
        return (
          <OnyxShortcut
            sequence={[{ any: ["Enter", "Space", "Tab", "Escape"] }]}
            style={{ margin: "0.5rem" }}
          />
        );
      }
      return (
        <OnyxShortcut
          sequence={[{ all: ["Control", "C"] }, { any: ["V"] }, { all: ["Enter"] }]}
          style={{ margin: "0.5rem" }}
        />
      );
    },
  });
});

test.describe("Interaction tests", () => {
  test("should render all keys and separators correctly", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <OnyxShortcut sequence={[{ all: ["Control", "C"] }, { any: ["V", "Insert"] }]} />,
    );

    // ASSERT
    await expect(component.locator("kbd")).toHaveCount(4);
    await expect(component.locator("text=+")).toHaveCount(1); // ALL separator within first step
    await expect(component.locator("text=/")).toHaveCount(1); // ANY separator within second step
    await expect(component.locator("text=→")).toHaveCount(1); // SEQUENCE separator between steps
  });

  test("should display OS-specific variant symbols", async ({ mount }) => {
    // ARRANGE
    const macComponent = await mount(
      <OnyxShortcut sequence={[{ all: ["Meta", "Shift", "C"] }]} variant="macOS" />,
    );

    // ASSERT
    await expect(macComponent.getByText("⌘")).toBeVisible(); // Command key
    await expect(macComponent.getByText("⇧")).toBeVisible(); // Shift key

    // ARRANGE
    const winComponent = await mount(
      <OnyxShortcut sequence={[{ all: ["Meta", "Shift", "C"] }]} variant="windows" />,
    );

    // ASSERT
    await expect(winComponent.getByText("⊞")).toBeVisible();
    await expect(winComponent.getByText("⇧")).toBeVisible();
  });

  test("should correctly integrate highlightPressed prop with composable state", async ({
    mount,
    page,
  }) => {
    // ARRANGE
    const component = await mount(
      <OnyxShortcut sequence={[{ all: ["Control", "C"] }]} highlightWhenPressed />,
    );

    // ACT
    await expect(component).toBeVisible();

    // ACT
    await page.keyboard.down("Control");

    // ASSERT
    const ctrlKey = component.locator("kbd").filter({ hasText: /^(ctrl|⌃)$/i });
    await expect(ctrlKey).toContainClass("onyx-key--highlighted");

    // ACT
    await page.keyboard.up("Control");

    // ASSERT
    await expect(ctrlKey).not.toContainClass("onyx-key--highlighted");
  });

  test("should emit sequenceComplete event when sequence is completed", async ({ mount, page }) => {
    // ARRANGE
    let isSequenceCompleteEmitted = false;
    await mount(OnyxShortcut, {
      props: {
        sequence: [{ all: ["Control", "C"] }],
      },
      on: {
        sequenceComplete: () => {
          isSequenceCompleteEmitted = true;
        },
      },
    });

    // ACT
    await page.keyboard.down("Control");
    await page.keyboard.press("c");
    await page.keyboard.up("Control");

    // ASSERT
    expect(isSequenceCompleteEmitted).toBe(true);
  });

  test("should emit stepComplete event at intermediate steps", async ({ mount, page }) => {
    // ARRANGE
    let isStepCompleteEmitted = false;
    await mount(OnyxShortcut, {
      props: {
        sequence: [{ all: ["Control", "C"] }, { any: ["V"] }],
      },
      on: {
        stepComplete: () => {
          isStepCompleteEmitted = true;
        },
      },
    });

    // ACT
    await page.keyboard.down("Control");
    await page.keyboard.press("c");
    await page.keyboard.up("Control");

    // ASSERT
    expect(isStepCompleteEmitted).toBe(true);
  });
});
