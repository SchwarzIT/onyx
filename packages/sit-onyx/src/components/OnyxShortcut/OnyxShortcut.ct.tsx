import type { MatrixScreenshotTestOptions } from "@sit-onyx/playwright-utils";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxShortcut from "./OnyxShortcut.vue";

const simpleKeys = ["Control", "c"];
const complexKeys = ["Control", "Shift", "Alt", "c"];

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
        highlightPressed={row === "highlighted"}
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
        highlightPressed={row === "highlighted"}
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
            ? [{ all: ["ctrl", "c"] }, { any: ["v", "insert"] }]
            : [{ all: ["ctrl", "shift"] }, { any: ["up", "down"] }, { all: ["enter"] }]
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
            ? [{ all: ["meta", "shift", "c"] }]
            : [{ all: ["ctrl", "f"] }, { any: ["1", "2", "3"] }]
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
      <OnyxShortcut sequence={[{ all: ["ctrl", "c"] }]} skeleton style={{ margin: "0.5rem" }} />
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
            sequence={[{ all: ["ctrl", "shift", "alt", "del"] }]}
            style={{ margin: "0.5rem" }}
          />
        );
      }
      if (column === "any-separator") {
        return (
          <OnyxShortcut
            sequence={[{ any: ["enter", "space", "tab", "esc"] }]}
            style={{ margin: "0.5rem" }}
          />
        );
      }
      return (
        <OnyxShortcut
          sequence={[{ all: ["ctrl", "c"] }, { any: ["v"] }, { all: ["enter"] }]}
          style={{ margin: "0.5rem" }}
        />
      );
    },
  });
});

test.describe("Interaction tests", () => {
  test("should render shortcut sequence correctly", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <OnyxShortcut sequence={[{ all: ["ctrl", "c"] }, { any: ["v", "insert"] }]} />,
    );
    const keys = component.locator("kbd");

    // ASSERT
    await expect(component).toBeVisible();

    // Should contain the keys
    await expect(keys.nth(0).getByText(/^(ctrl|⌃)$/i)).toBeVisible();
    await expect(keys.nth(1).getByText("c")).toBeVisible();
    await expect(keys.nth(2).getByText("v")).toBeVisible();
    await expect(keys.nth(3).getByText("insert")).toBeVisible();

    // Should contain separators
    await expect(component.locator("text=+")).toBeVisible(); // ALL separator
    await expect(component.locator("text=/")).toBeVisible(); // ANY separator
    await expect(component.locator("text=→")).toBeVisible(); // SEQUENCE separator
  });

  test("should render skeleton state", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<OnyxShortcut sequence={[{ all: ["ctrl", "c"] }]} skeleton />);

    // ASSERT
    await expect(component).toHaveClass(/onyx-shortcut-skeleton/);
    await expect(component.locator(".onyx-shortcut")).toBeHidden();
  });

  test("should handle OS variants correctly", async ({ mount }) => {
    // ARRANGE - macOS variant
    const macComponent = await mount(
      <OnyxShortcut sequence={[{ all: ["meta", "shift", "c"] }]} variant="macOS" />,
    );

    // ASSERT - Should show macOS symbols
    await expect(macComponent.getByText("⌘")).toBeVisible(); // Command key
    await expect(macComponent.getByText("⇧")).toBeVisible(); // Shift key

    // ARRANGE - Windows variant
    const winComponent = await mount(
      <OnyxShortcut sequence={[{ all: ["meta", "shift", "c"] }]} variant="windows" />,
    );

    // ASSERT - Should show Windows symbols
    await expect(winComponent.getByText("⊞")).toBeVisible(); // Windows key
    await expect(winComponent.getByText("Shift")).toBeVisible(); // Shift key
  });

  test("should handle single step with all keys", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<OnyxShortcut sequence={[{ all: ["ctrl", "shift", "f"] }]} />);
    const keys = component.locator("kbd");

    // ASSERT
    await expect(keys.nth(0).getByText(/^(ctrl|⌃)$/i)).toBeVisible();
    await expect(keys.nth(1).getByText(/⇧|shift/i)).toBeVisible();
    await expect(keys.nth(2).getByText("F")).toBeVisible();

    // Should have ALL separators between keys
    const separators = component.locator("text=+");
    await expect(separators).toHaveCount(2); // Between 3 keys = 2 separators
  });

  test("should handle single step with any keys", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<OnyxShortcut sequence={[{ any: ["enter", "space", "esc"] }]} />);
    const keys = component.locator("kbd");

    // ASSERT
    await expect(keys.nth(0).getByText(/↩︎|enter/i)).toBeVisible();
    await expect(keys.nth(1).getByText(/␣|space/i)).toBeVisible();
    await expect(keys.nth(2).getByText(/⎋|esc/i)).toBeVisible();

    // Should have ANY separators between keys
    const separators = component.locator("text=/");
    await expect(separators).toHaveCount(2); // Between 3 keys = 2 separators
  });

  test("should handle multi-step sequences", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <OnyxShortcut
        sequence={[{ all: ["ctrl", "x"] }, { any: ["up", "down"] }, { all: ["enter"] }]}
      />,
    );
    const keys = component.locator("kbd");

    // ASSERT - All keys should be present
    await expect(keys.nth(0).getByText(/^(ctrl|⌃)$/i)).toBeVisible();
    await expect(keys.nth(1).getByText("X")).toBeVisible();
    await expect(keys.nth(2).getByText(/^(↑|up)$/i)).toBeVisible();
    await expect(keys.nth(3).getByText(/^(↓|down)$/i)).toBeVisible();
    await expect(keys.nth(4).getByText(/^(enter|↩︎)$/i)).toBeVisible();

    // Should have proper separators
    await expect(component.locator("text=+")).toBeVisible(); // ALL separator
    await expect(component.locator("text=/")).toBeVisible(); // ANY separator
    const sequenceSeparators = component.locator("text=→");
    await expect(sequenceSeparators).toHaveCount(2); // Between 3 steps = 2 separators
  });

  test("should emit shortcutActivated when sequence is completed", async ({ mount, page }) => {
    let shortcutActivated = false;

    // ARRANGE
    const component = await mount(OnyxShortcut, {
      props: {
        sequence: [{ all: ["ctrl", "c"] }],
      },
      on: {
        shortcutActivated: () => {
          shortcutActivated = true;
        },
      },
    });

    await expect(component).toBeVisible();

    // ACT - Press the shortcut keys
    await page.keyboard.down("Control");
    await page.keyboard.press("c");
    await page.keyboard.up("Control");

    // ASSERT
    expect(shortcutActivated).toBe(true);
  });

  test("should handle highlight pressed state", async ({ mount, page }) => {
    // ARRANGE
    const component = await mount(
      <OnyxShortcut sequence={[{ all: ["ctrl", "c"] }]} highlightPressed={true} />,
    );

    await expect(component).toBeVisible();

    // ACT - Press Control key
    await page.keyboard.down("Control");

    // ASSERT - Control key should be visually pressed
    const ctrlKey = component.locator("kbd").filter({ hasText: /^(ctrl|⌃)$/i });
    await expect(ctrlKey).toHaveAttribute("data-pressed", "true");

    // ACT - Release Control key
    await page.keyboard.up("Control");

    // ASSERT - Control key should not be pressed anymore
    await expect(ctrlKey).not.toHaveAttribute("data-pressed", "true");
  });

  test("should handle complex multi-step sequence with highlighting", async ({ mount, page }) => {
    let shortcutCompleted = false;

    // ARRANGE
    const component = await mount(OnyxShortcut, {
      props: {
        sequence: [{ all: ["ctrl", "c"] }, { any: ["v", "insert"] }],
        highlightPressed: true,
      },
      on: {
        shortcutActivated: () => {
          shortcutCompleted = true;
        },
      },
    });

    await expect(component).toBeVisible();

    // ACT - First step: Ctrl+C
    await page.keyboard.down("Control");
    await page.keyboard.press("c");
    await page.keyboard.up("Control");

    // ASSERT - First step completed, not yet fully done
    expect(shortcutCompleted).toBe(false);

    // ACT - Second step: Press V
    await page.keyboard.press("v");

    // ASSERT - Full sequence completed
    expect(shortcutCompleted).toBe(true);
  });

  test("should handle empty steps gracefully", async ({ mount }) => {
    // ARRANGE - Edge case with empty step
    const component = await mount(<OnyxShortcut sequence={[{ all: [] }, { any: ["enter"] }]} />);

    // ASSERT - Should still render without errors
    await expect(component).toBeVisible();
    await expect(component.getByText(/^(enter|↩︎)$/i)).toBeVisible();
  });

  test("should handle duplicate keys in different steps", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <OnyxShortcut
        sequence={[{ all: ["ctrl", "c"] }, { all: ["ctrl", "v"] }]}
        highlightPressed={true}
      />,
    );

    // ASSERT - Both ctrl keys should be rendered
    await expect(component).toBeVisible();
    const ctrlKeys = component.locator("kbd").filter({ hasText: /^(ctrl|⌃)$/i });
    await expect(ctrlKeys).toHaveCount(2);
  });

  test("should handle function keys and special characters", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <OnyxShortcut sequence={[{ all: ["F5", "shift"] }, { any: ["?", "!", "@"] }]} />,
    );
    const keys = component.locator("kbd");

    // ASSERT
    await expect(keys.nth(0).getByText("F5")).toBeVisible();
    await expect(keys.nth(1).getByText(/⇧|shift/i)).toBeVisible();
    await expect(keys.nth(2).getByText("?")).toBeVisible();
    await expect(keys.nth(3).getByText("!")).toBeVisible();
    await expect(keys.nth(4).getByText("@")).toBeVisible();
  });
});
