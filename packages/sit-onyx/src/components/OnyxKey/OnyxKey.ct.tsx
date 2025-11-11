import type { MatrixScreenshotTestOptions } from "@sit-onyx/playwright-utils";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import { CANONICAL_KEYS } from "../../utils/shortcut.js";
import OnyxKey from "./OnyxKey.vue";

const screenshotOptions = {
  rows: ["default", "pressed"] as const,
} satisfies Partial<MatrixScreenshotTestOptions>;

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (modifier keys)",
    columns: ["meta", "control", "alt", "shift"],
    component: (column, row) => (
      <OnyxKey keyName={column} pressed={row === "pressed"} style={{ margin: "0.25rem" }} />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (navigation keys)",
    columns: ["up", "down", "left", "right"],
    component: (column, row) => (
      <OnyxKey keyName={column} pressed={row === "pressed"} style={{ margin: "0.25rem" }} />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (special keys)",
    columns: ["enter", "space", "tab", "esc"],
    component: (column, row) => (
      <OnyxKey keyName={column} pressed={row === "pressed"} style={{ margin: "0.25rem" }} />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Key (function and editing)",
    columns: ["backspace", "delete", "home", "end"],
    component: (column, row) => (
      <OnyxKey keyName={column} pressed={row === "pressed"} style={{ margin: "0.25rem" }} />
    ),
  });

  executeMatrixScreenshotTest({
    name: "Key (OS variants)",
    columns: ["macOS", "windows", "generic"],
    rows: ["meta", "control", "alt", "option"],
    component: (column, row) => (
      <OnyxKey keyName={row} variant={column} style={{ margin: "0.25rem" }} />
    ),
  });

  executeMatrixScreenshotTest({
    name: "Key (alphanumeric)",
    columns: ["A", "1", "F5", "?"],
    rows: ["default", "pressed"],
    component: (column, row) => (
      <OnyxKey keyName={column} pressed={row === "pressed"} style={{ margin: "0.25rem" }} />
    ),
  });

  executeMatrixScreenshotTest({
    name: "Key (skeleton)",
    columns: ["default"],
    rows: ["skeleton"],
    component: () => <OnyxKey keyName="enter" skeleton style={{ margin: "0.25rem" }} />,
  });
});

test.describe("Interaction tests", () => {
  test("should render key with correct visual label", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<OnyxKey keyName="enter" />);

    // ASSERT
    await expect(component).toBeVisible();
    await expect(component).toHaveAccessibleName("Enter key");
  });

  test("should show OS-specific symbols for modifier keys", async ({ mount }) => {
    // ARRANGE - macOS variant
    const macComponent = await mount(<OnyxKey keyName="meta" variant="macOS" />);

    // ASSERT - Should show command symbol
    await expect(macComponent).toContainText("⌘");

    // ARRANGE - Windows variant
    const winComponent = await mount(<OnyxKey keyName="meta" variant="windows" />);

    // ASSERT - Should show Windows symbol
    await expect(winComponent).toContainText("⊞");
  });

  test("should handle pressed state visually", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<OnyxKey keyName="enter" pressed />);

    // ASSERT
    await expect(component).toHaveAttribute("data-pressed", "true");
  });

  test("should not show pressed attribute when not pressed", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<OnyxKey keyName="enter" pressed={false} />);

    // ASSERT
    await expect(component).not.toHaveAttribute("data-pressed");
  });

  test("should render skeleton state", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<OnyxKey keyName="enter" skeleton />);

    // ASSERT - Using regex
    await expect(component).toHaveClass(/onyx-key-skeleton/);
    await expect(component).not.toHaveClass(/^onyx-key$/); // Exact match
  });

  test("should have proper accessibility label", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<OnyxKey keyName="enter" />);

    // ASSERT
    await expect(component).toHaveAccessibleName("Enter key");
  });

  test("should use custom accessibility label when provided", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<OnyxKey keyName="ctrl" label="Control key for shortcuts" />);

    // ASSERT
    await expect(component).toHaveAccessibleName("Control key for shortcuts");
  });

  test("should handle arrow key symbols", async ({ mount }) => {
    // ARRANGE
    const upComponent = await mount(<OnyxKey keyName="up" />);
    // ASSERT
    await expect(upComponent).toContainText("↑");

    // ARRANGE
    const downComponent = await mount(<OnyxKey keyName="down" />);
    // ASSERT
    await expect(downComponent).toContainText("↓");

    // ARRANGE
    const leftComponent = await mount(<OnyxKey keyName="left" />);
    // ASSERT
    await expect(leftComponent).toContainText("←");

    // ARRANGE
    const rightComponent = await mount(<OnyxKey keyName="right" />);
    // ASSERT
    await expect(rightComponent).toContainText("→");
  });

  test("should handle function keys correctly", async ({ mount }) => {
    // ARRANGE
    const f1Component = await mount(<OnyxKey keyName="F1" />);

    // ASSERT
    await expect(f1Component).toContainText("F1");
    await expect(f1Component).toHaveAccessibleName("F1 key");

    // ARRANGE
    const f12Component = await mount(<OnyxKey keyName="F12" />);

    // ASSERT
    await expect(f12Component).toContainText("F12");
    await expect(f12Component).toHaveAccessibleName("F12 key");
  });

  test("should handle alphanumeric keys", async ({ mount }) => {
    // ARRANGE
    const letterComponent = await mount(<OnyxKey keyName="A" />);
    // ASSERT
    await expect(letterComponent).toContainText("A");

    // ARRANGE
    const numberComponent = await mount(<OnyxKey keyName="1" />);
    // ASSERT
    await expect(numberComponent).toContainText("1");

    // ARRANGE
    const symbolComponent = await mount(<OnyxKey keyName="?" />);
    // ASSERT
    await expect(symbolComponent).toContainText("?");
  });

  test("should handle space key specially", async ({ mount }) => {
    // ARRANGE
    const macComponent = await mount(<OnyxKey keyName="space" variant="macOS" />);
    // ASSERT
    await expect(macComponent).toContainText("␣");
    await expect(macComponent).toHaveAccessibleName("Space key");

    // ARRANGE
    const winComponent = await mount(<OnyxKey keyName="space" variant="windows" />);
    // ASSERT
    await expect(winComponent).toContainText("Space");
    await expect(winComponent).toHaveAccessibleName("Space key");
  });

  test("should handle all canonical keys without errors", async ({ mount }) => {
    // ARRANGE & ASSERT - Test all canonical keys can be rendered
    const canonicalKeys = CANONICAL_KEYS.filter((key) => key !== "unknown");

    for (const keyName of canonicalKeys) {
      const component = await mount(<OnyxKey keyName={keyName} />);
      await expect(component).toBeVisible();
      await expect(component).toHaveAccessibleName(/.+ key$/);
    }
  });

  test("should handle unknown/custom keys gracefully", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<OnyxKey keyName="CustomKey123" />);

    // ASSERT
    await expect(component).toHaveAccessibleName("CustomKey123 key");
  });
});
