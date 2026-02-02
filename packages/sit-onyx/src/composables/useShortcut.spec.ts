import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { nextTick, ref } from "vue";
import { _unstableUseShortcut } from "./useShortcut.js";

vi.mock("vue", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("vue")>()),
    // this will only affect "foo" outside of the original module
    onBeforeMount: (callback) => callback(),
    onBeforeUnmount: vi.fn(),
  } satisfies typeof import("vue");
});

describe("useShortcut", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test("should initialize with correct default values", () => {
    // ARRANGE
    const { currentStepIndex, pressedKeys, isKeyHighlighted } = _unstableUseShortcut({
      sequence: [{ all: ["Control", "C"] }],
    });

    // ASSERT - Initial state
    expect(currentStepIndex.value).toBe(0);
    expect(pressedKeys.value.size).toBe(0);
    expect(isKeyHighlighted.value("Control", 0)).toBe(false);
    expect(isKeyHighlighted.value("C", 0)).toBe(false);
  });

  describe("single step sequences", () => {
    test("should handle single 'all' step shortcut", () => {
      // ARRANGE
      const onComplete = vi.fn();
      const { currentStepIndex, pressedKeys } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
        onComplete,
      });

      // ACT
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));

      // ASSERT
      expect(pressedKeys.value.has("Control")).toBe(true);
      expect(currentStepIndex.value).toBe(0);
      expect(onComplete).not.toHaveBeenCalled();

      // ACT
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));

      // ASSERT
      expect(
        pressedKeys.value.size,
        "should reset pressed keys if invalid character is pressed",
      ).toBe(0);
      expect(onComplete).not.toHaveBeenCalled();

      // ACT
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "c" }));

      // ASSERT
      expect(pressedKeys.value.has("C")).toBe(true);
      expect(onComplete).toHaveBeenCalledOnce();
    });

    test("should handle single 'any' step shortcut and pass key parameter", () => {
      // ARRANGE
      const onComplete = vi.fn();
      const { pressedKeys } = _unstableUseShortcut({
        sequence: [{ any: ["Enter", "Space"] }],
        onComplete,
      });

      // ACT
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

      // ASSERT
      expect(pressedKeys.value.has("Enter")).toBe(true);
      expect(onComplete).toHaveBeenCalledOnce();

      // ACT
      document.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));

      // ASSERT
      expect(pressedKeys.value.size, "should clear pressed keys on keyup").toBe(0);

      // ACT
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Space" }));

      // ASSERT
      expect(pressedKeys.value.has("Space")).toBe(true);
      expect(onComplete).toHaveBeenCalledTimes(2);

      // ACT
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "A" }));

      // ASSERT
      expect(pressedKeys.value.has("A")).toBe(false);
      expect(onComplete).toHaveBeenCalledTimes(2);
    });
  });

  describe("multi step sequences", () => {
    test("should handle multi step sequences", () => {
      // ARRANGE
      const onStepComplete = vi.fn();
      const onComplete = vi.fn();
      const { currentStepIndex } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }, { any: ["V", "Insert"] }],
        onStepComplete,
        onComplete,
      });

      // ACT
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "c" }));
      document.dispatchEvent(new KeyboardEvent("keyup", { key: "Control" }));
      document.dispatchEvent(new KeyboardEvent("keyup", { key: "c" }));

      // ASSERT
      expect(currentStepIndex.value).toBe(1);
      expect(onComplete).not.toHaveBeenCalled();
      expect(onStepComplete).toHaveBeenCalledExactlyOnceWith({ all: ["Control", "C"] }, 0);

      // ACT Second step: V
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "v" }));
      document.dispatchEvent(new KeyboardEvent("keyup", { key: "v" }));

      // ASSERT - should complete sequence
      expect(onComplete).toHaveBeenCalledOnce();
      expect(currentStepIndex.value).toBe(0);
    });
  });

  describe("key highlighting", () => {
    test("should highlight pressed keys correctly", () => {
      // ARRANGE
      const { isKeyHighlighted } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
      });

      // ASSERT
      expect(isKeyHighlighted.value("Control", 0)).toBe(false);
      expect(isKeyHighlighted.value("C", 0)).toBe(false);

      // ACT
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));

      // ASSERT
      expect(isKeyHighlighted.value("Control", 0)).toBe(true);
      expect(isKeyHighlighted.value("C", 0)).toBe(false);

      // ACT
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "C" }));

      // ASSERT
      expect(isKeyHighlighted.value("Control", 0)).toBe(true);
      expect(isKeyHighlighted.value("C", 0)).toBe(true);

      // ACT
      document.dispatchEvent(new KeyboardEvent("keyup", { key: "Control" }));

      // ASSERT
      expect(isKeyHighlighted.value("C", 0)).toBe(true);
      expect(isKeyHighlighted.value("Control", 0)).toBe(false);

      // ACT
      document.dispatchEvent(new KeyboardEvent("keyup", { key: "C" }));

      // ASSERT
      expect(isKeyHighlighted.value("Control", 0)).toBe(false);
      expect(isKeyHighlighted.value("C", 0)).toBe(false);
    });

    test("should handle key highlighting in multi-step sequences", () => {
      // ARRANGE
      const onComplete = vi.fn();
      const { isKeyHighlighted, currentStepIndex } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "K"] }, { all: ["Control", "L"] }],
        onComplete,
      });

      // ACT
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));

      // ASSERT
      expect(isKeyHighlighted.value("Control", 0)).toBe(true);

      // ACT
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "k" }));
      expect(isKeyHighlighted.value("K", 0)).toBe(true);
      expect(currentStepIndex.value).toBe(1);

      // ACT
      document.dispatchEvent(new KeyboardEvent("keyup", { key: "k" }));

      // ASSERT
      expect(isKeyHighlighted.value("K", 0)).toBe(false);
      expect(isKeyHighlighted.value("Control", 1)).toBe(true);

      // ACT
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "L" }));

      // ASSERT
      expect(onComplete).toHaveBeenCalledOnce();
      expect(isKeyHighlighted.value("Control", 1)).toBe(true);

      // ACT
      document.dispatchEvent(new KeyboardEvent("keyup", { key: "L" }));
      expect(isKeyHighlighted.value("Control", 0)).toBe(true);
    });

    test("should correctly be highlighted when ctrl is held across steps", () => {
      // ARRANGE
      const onComplete = vi.fn();
      const { isKeyHighlighted, currentStepIndex, pressedKeys } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }, { all: ["Control", "V"] }],
        onComplete,
      });

      // ACT
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "c" }));

      // ASSERT
      expect(currentStepIndex.value).toBe(1);
      expect(isKeyHighlighted.value("Control", 0)).toBe(true);

      // ACT: Step 1: Ctrl+V (Ctrl still held)
      document.dispatchEvent(new KeyboardEvent("keyup", { key: "c" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "v" }));
      document.dispatchEvent(new KeyboardEvent("keyup", { key: "v" }));

      // ASSERT
      expect(onComplete).toHaveBeenCalledOnce();
      expect(pressedKeys.value.has("Control")).toBe(true);

      // ACT: NOW: Ctrl still held from the previous step
      // Press C again to match step 0 again
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "c" }));

      // ASSERT: Ctrl should now belong to step 0 (after reset)
      expect(isKeyHighlighted.value("Control", 0)).toBe(true);
      expect(isKeyHighlighted.value("Control", 1)).toBe(false);
    });
  });

  describe("edge cases", () => {
    test("should handle meta/control key edge case", () => {
      // ARRANGE
      const { pressedKeys } = _unstableUseShortcut({ sequence: [{ all: ["Meta", "C"] }] });

      // ACT
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Meta" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "c" }));

      // ASSERT
      expect(pressedKeys.value.size).toBe(2);

      // ACT
      document.dispatchEvent(new KeyboardEvent("keyup", { key: "Meta" }));
      document.dispatchEvent(new KeyboardEvent("keyup", { key: "c" }));

      // ASSERT
      expect(pressedKeys.value.size).toBe(0);
    });

    test("should handle digit keys with layout-specific symbols", () => {
      // ARRANGE
      const onComplete = vi.fn();
      _unstableUseShortcut({
        sequence: [{ all: ["Control", "2"] }],
        onComplete,
      });

      // ACT
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "@", code: "Digit2" }));

      // ASSERT - Shift+2 might produce "@" but code is "Digit2"
      expect(onComplete).toHaveBeenCalledOnce();
    });
  });

  test("should not trigger listeners when disabled", async () => {
    // ARRANGE
    const onComplete = vi.fn();
    const disabled = ref(true);

    const { pressedKeys } = _unstableUseShortcut({
      sequence: [{ all: ["Control", "C"] }],
      onComplete,
      disabled,
    });

    // ACT
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "c" }));

    // ASSERT
    expect(pressedKeys.value.size).toBe(0);
    expect(onComplete).not.toHaveBeenCalled();

    // ACT
    disabled.value = false;
    await nextTick();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "c" }));

    // ASSERT
    expect(pressedKeys.value.size).toBe(2);
    expect(onComplete).toHaveBeenCalled();
  });

  test("should debounce cleanup function", () => {
    // ARRANGE
    const { pressedKeys, currentStepIndex } = _unstableUseShortcut({
      sequence: [{ all: ["Control", "C"] }],
      cleanupDelay: 300,
    });

    // ACT
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));
    expect(pressedKeys.value.size).toBe(1);

    // ACT
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "c" }));
    expect(pressedKeys.value.size).toBe(2);

    // fast-forward time but not past cleanup delay
    vi.advanceTimersByTime(200);

    // ASSERT - Keys should still be present
    expect(pressedKeys.value.size).toBe(2);

    // ACT - Fast-forward past cleanup delay
    vi.advanceTimersByTime(100);

    // ASSERT - Keys should be cleared
    expect(pressedKeys.value.size).toBe(0);
    expect(currentStepIndex.value).toBe(0);
  });

  test("should listen to events on specific element", () => {
    // ARRANGE
    const element = document.createElement("div");
    const onComplete = vi.fn();

    const { pressedKeys } = _unstableUseShortcut({
      sequence: [{ all: ["Control", "C"] }],
      onComplete,
      element,
    });

    // ACT
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "c" }));

    // ASSERT
    expect(pressedKeys.value.size, "should disable global listeners").toBe(0);
    expect(onComplete).not.toHaveBeenCalled();

    // ACT
    element.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));
    element.dispatchEvent(new KeyboardEvent("keydown", { key: "c" }));

    // ASSERT
    expect(pressedKeys.value.size).toBe(2);
    expect(onComplete).toHaveBeenCalledOnce();
  });

  test("should handle repeated keydown events", async () => {
    // ARRANGE
    const onComplete = vi.fn();
    const listenOnRepeat = ref(false);

    _unstableUseShortcut({
      sequence: [{ all: ["Control", "C"] }],
      listenOnRepeat,
      onComplete,
    });

    // ACT
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "c" }));
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "c", repeat: true }));

    // ASSERT
    expect(
      onComplete,
      "should not consider repeated keydown events by default",
    ).toHaveBeenCalledOnce();

    // ACT
    listenOnRepeat.value = true;
    await nextTick();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "c", repeat: true }));

    // ASSERT
    expect(onComplete).toHaveBeenCalledTimes(2);
  });
});
