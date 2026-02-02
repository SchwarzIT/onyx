import { useGlobalEventListener } from "@sit-onyx/headless";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { ref } from "vue";
import { _unstableUseShortcut } from "./useShortcut.js";

vi.mock("@sit-onyx/headless", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@sit-onyx/headless")>();
  return {
    ...actual,
    useGlobalEventListener: vi.fn(),
    debounce: vi.fn((fn, delay) => actual.debounce(fn, delay)),
  };
});

vi.mock("vue", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("vue")>()),
    // this will only affect "foo" outside of the original module
    onBeforeMount: (callback) => callback(),
    onBeforeUnmount: vi.fn(),
  } satisfies typeof import("vue");
});

const mockUseGlobalEventListener = vi.mocked(useGlobalEventListener);

describe("useShortcut", () => {
  let keydownListeners: ((event: KeyboardEvent) => void)[] = [];
  let keyupListeners: ((event: KeyboardEvent) => void)[] = [];
  let blurListeners: (() => void)[] = [];
  let focusListeners: (() => void)[] = [];
  let elementListeners: Record<string, ((event: KeyboardEvent | Event) => void)[]> = {};

  const createKeyboardEvent = (
    type: string,
    key: string,
    code?: string,
    repeat?: boolean,
  ): KeyboardEvent => {
    const event = new KeyboardEvent(type, {
      key,
      code: code ?? key,
      bubbles: true,
      cancelable: true,
      repeat: repeat ?? false,
    });
    vi.spyOn(event, "preventDefault");
    vi.spyOn(event, "stopPropagation");
    return event;
  };

  const triggerKeydown = (key: string, code?: string, repeat?: boolean) => {
    const event = createKeyboardEvent("keydown", key, code, repeat);
    keydownListeners.forEach((listener) => listener(event));

    if (elementListeners["keydown"]) {
      elementListeners["keydown"].forEach((listener) => listener(event));
    }
    return event;
  };

  const triggerKeyup = (key: string, code?: string) => {
    const event = createKeyboardEvent("keyup", key, code);
    keyupListeners.forEach((listener) => listener(event));

    if (elementListeners["keyup"]) {
      elementListeners["keyup"].forEach((listener) => listener(event));
    }
    return event;
  };

  const triggerBlur = () => {
    const event = new Event("blur");
    blurListeners.forEach((listener) => listener());
    if (elementListeners["blur"]) {
      elementListeners["blur"].forEach((listener) => listener(event));
    }
  };

  const triggerFocus = () => {
    const event = new Event("focus");
    focusListeners.forEach((listener) => listener());
    if (elementListeners["focus"]) {
      elementListeners["focus"].forEach((listener) => listener(event));
    }
  };

  beforeEach(() => {
    keydownListeners = [];
    keyupListeners = [];
    blurListeners = [];
    focusListeners = [];
    elementListeners = {};

    mockUseGlobalEventListener.mockImplementation((options) => {
      if (options.type === "keydown")
        keydownListeners.push(options.listener as (event: KeyboardEvent) => void);
      else if (options.type === "keyup")
        keyupListeners.push(options.listener as (event: KeyboardEvent) => void);
      else if (options.type === "blur") blurListeners.push(options.listener as () => void);
    });

    // Mock window.addEventListener and window.removeEventListener
    vi.spyOn(window, "addEventListener").mockImplementation((event, listener) => {
      if (event === "blur") blurListeners.push(listener as () => void);
      else if (event === "focus") focusListeners.push(listener as () => void);
    });

    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe("initialization", () => {
    test("should initialize with correct default values", () => {
      // ARRANGE
      const { currentStepIndex, pressedKeys, isKeyHighlighted } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
      });

      // ASSERT - Initial state
      expect(currentStepIndex.value).toBe(0);
      expect(pressedKeys.value.size).toBe(0);
      expect(isKeyHighlighted.value("Control", 0)).toBeFalsy();
      expect(isKeyHighlighted.value("C", 0)).toBeFalsy();
    });
  });

  describe("single step sequences", () => {
    test("should handle single 'all' step shortcut and pass key parameter", () => {
      // ARRANGE
      const onSequenceComplete = vi.fn();
      const { currentStepIndex, pressedKeys } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
        onSequenceComplete,
      });

      // ACT Press Ctrl
      triggerKeydown("Control");

      // ASSERT - Ctrl is pressed, still on step 0
      expect(pressedKeys.value.has("Control")).toBeTruthy();
      expect(currentStepIndex.value).toBe(0);
      expect(onSequenceComplete).not.toHaveBeenCalled();

      // ACT Press C
      triggerKeydown("c");

      // ASSERT - Both keys pressed, sequence completed
      expect(pressedKeys.value.has("C")).toBeTruthy();
      expect(onSequenceComplete).toHaveBeenCalledExactlyOnceWith();
    });

    test("should handle single 'any' step shortcut and pass key parameter", () => {
      // ARRANGE
      const onSequenceComplete = vi.fn();
      const { pressedKeys } = _unstableUseShortcut({
        sequence: [{ any: ["Enter", "Space"] }],
        onSequenceComplete,
      });

      // ACT
      triggerKeydown("Enter");

      // ASSERT - should complete sequence immediately
      expect(pressedKeys.value.has("Enter")).toBeTruthy();
      expect(onSequenceComplete).toHaveBeenCalledExactlyOnceWith();

      // ACT Release keys
      triggerKeyup("Enter");

      // ASSERT - pressedKeys should be cleared
      expect(pressedKeys.value.size).toBe(0);
    });

    test("should not ignore irrelevant keys", () => {
      // ARRANGE
      const onSequenceComplete = vi.fn();
      _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
        onSequenceComplete,
      });

      // ACT
      triggerKeydown("Control");
      triggerKeydown("x");
      triggerKeydown("c");

      // ASSERT - should not complete sequence
      expect(onSequenceComplete).not.toHaveBeenCalledOnce();

      // ACT
      triggerKeyup("Control");
      triggerKeyup("x");
      triggerKeyup("c");

      triggerKeydown("Control");
      triggerKeydown("c");

      // ASSERT - should complete sequence
      expect(onSequenceComplete).toHaveBeenCalledOnce();
    });
  });

  describe("multi-step sequences", () => {
    test("should handle multi-step sequence and pass key parameter to callbacks", () => {
      // ARRANGE
      const onStepComplete = vi.fn();
      const onSequenceComplete = vi.fn();
      const { currentStepIndex } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }, { any: ["V", "Insert"] }],
        onStepComplete,
        onSequenceComplete,
      });

      // ACT First step: Ctrl+C
      triggerKeydown("Control");
      triggerKeydown("c");
      triggerKeyup("Control");
      triggerKeyup("c");

      // ASSERT - should move to step 1
      expect(currentStepIndex.value).toBe(1);
      expect(onSequenceComplete).not.toHaveBeenCalled();
      expect(onStepComplete).toHaveBeenCalledOnce();
      expect(onStepComplete).toHaveBeenCalledExactlyOnceWith({ all: ["Control", "C"] }, 0);

      // ACT Second step: V
      triggerKeydown("v");
      triggerKeyup("v");

      // ASSERT - should complete sequence
      expect(onSequenceComplete).toHaveBeenCalledExactlyOnceWith();
      expect(currentStepIndex.value).toBe(0);
    });
  });

  describe("key highlighting", () => {
    test("should highlight pressed keys correctly", () => {
      // ARRANGE
      const { isKeyHighlighted } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
      });

      // ASSERT - No keys pressed initially
      expect(isKeyHighlighted.value("Control", 0)).toBeFalsy();
      expect(isKeyHighlighted.value("C", 0)).toBeFalsy();

      // ACT - Press Ctrl
      triggerKeydown("Control");

      // ASSERT - only Ctrl should be highlighted
      expect(isKeyHighlighted.value("Control", 0)).toBeTruthy();
      expect(isKeyHighlighted.value("C", 0)).toBeFalsy();

      // ACT - Press C
      triggerKeydown("C");

      // ASSERT - both keys should be highlighted
      expect(isKeyHighlighted.value("Control", 0)).toBeTruthy();
      expect(isKeyHighlighted.value("C", 0)).toBeTruthy();

      // ACT - Release Ctrl
      triggerKeyup("Control");

      // ASSERT - only C should be highlighted
      expect(isKeyHighlighted.value("C", 0)).toBeTruthy();
      expect(isKeyHighlighted.value("Control", 0)).toBeFalsy();

      // ACT - Release C
      triggerKeyup("C");

      // ASSERT - No keys should be highlighted
      expect(isKeyHighlighted.value("Control", 0)).toBeFalsy();
      expect(isKeyHighlighted.value("C", 0)).toBeFalsy();
    });

    test("should handle key highlighting in multi-step sequences", () => {
      // ARRANGE
      const onSequenceComplete = vi.fn();
      const { isKeyHighlighted, currentStepIndex } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "K"] }, { all: ["Control", "L"] }],
        onSequenceComplete,
      });

      // ACT
      triggerKeydown("Control");

      // ASSERT
      expect(isKeyHighlighted.value("Control", 0)).toBeTruthy();

      // ACT
      triggerKeydown("k");
      expect(isKeyHighlighted.value("K", 0)).toBeTruthy();
      expect(currentStepIndex.value).toBe(1);

      // ACT
      triggerKeyup("k");

      // ASSERT
      expect(isKeyHighlighted.value("K", 0)).toBeFalsy();
      expect(isKeyHighlighted.value("Control", 1)).toBeTruthy();

      // ACT
      triggerKeydown("L");

      // ASSERT
      expect(onSequenceComplete).toHaveBeenCalledOnce();
      expect(isKeyHighlighted.value("Control", 1)).toBeTruthy();

      // ACT
      triggerKeyup("L");
      expect(isKeyHighlighted.value("Control", 0)).toBeTruthy();
    });
  });

  describe("key release handling", () => {
    test("should remove keys from pressed set on keyup", () => {
      // ARRANGE
      const { pressedKeys } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
      });

      // ACT
      triggerKeydown("Control");

      // ASSERT
      expect(pressedKeys.value.has("Control")).toBeTruthy();

      // ACT
      triggerKeyup("Control");

      // ASSERT
      expect(pressedKeys.value.has("Control")).toBeFalsy();
    });

    test("should handle meta/control key edge case", () => {
      // ARRANGE
      const { pressedKeys } = _unstableUseShortcut({ sequence: [{ all: ["Meta", "C"] }] });

      // ACT
      triggerKeydown("Meta");
      triggerKeydown("c");

      // ASSERT
      expect(pressedKeys.value.size).toBe(2);

      // ACT
      triggerKeyup("Meta");
      triggerKeyup("c");

      // ASSERT
      expect(pressedKeys.value.size).toBe(0);
    });
  });

  describe("edge cases", () => {
    test("should handle digit keys with layout-specific symbols", () => {
      // ARRANGE
      const onSequenceComplete = vi.fn();
      _unstableUseShortcut({ sequence: [{ all: ["Control", "2"] }], onSequenceComplete });

      // ACT
      triggerKeydown("Control");
      triggerKeydown("@", "Digit2");

      // ASSERT Shift+2 might produce "@" but code is "Digit2"
      expect(onSequenceComplete).toHaveBeenCalledOnce();
    });

    test("should correctly be highlighted when ctrl is held across steps", () => {
      // ARRANGE
      const onSequenceComplete = vi.fn();
      const { isKeyHighlighted, currentStepIndex, pressedKeys } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }, { all: ["Control", "V"] }],
        onSequenceComplete: onSequenceComplete,
      });

      // ACT
      triggerKeydown("Control");
      triggerKeydown("c");

      // ASSERT
      expect(currentStepIndex.value).toBe(1);
      expect(isKeyHighlighted.value("Control", 0)).toBeTruthy();

      // ACT: Step 1: Ctrl+V (Ctrl still held)
      triggerKeyup("c");
      triggerKeydown("v");
      triggerKeyup("v");

      // ASSERT
      expect(onSequenceComplete).toHaveBeenCalledOnce();
      expect(pressedKeys.value.has("Control")).toBeTruthy();

      // ACT: NOW: Ctrl still held from the previous step
      // Press C again to match step 0 again
      triggerKeydown("c");

      // ASSERT: Ctrl should now belong to step 0 (after reset)
      expect(isKeyHighlighted.value("Control", 0)).toBe(true);
      expect(isKeyHighlighted.value("Control", 1)).toBe(false);
    });
  });

  describe("preventDefault and stopPropagation", () => {
    test("should prevent default and stop propagation on keydown when configured", () => {
      // ARRANGE
      _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
        preventDefaultOn: "keydown",
        stopPropagationOn: "keydown",
      });

      // ACT
      const event = triggerKeydown("Control");

      // ASSERT
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    test("should prevent default on stepComplete", () => {
      // ARRANGE
      const onStepComplete = vi.fn();
      _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }, { any: ["V"] }],
        onStepComplete,
        preventDefaultOn: "stepComplete",
      });

      // ACT
      const ctrlEvent = triggerKeydown("Control");
      const cEvent = triggerKeydown("c");

      // ASSERT
      expect(ctrlEvent.preventDefault).not.toHaveBeenCalled();
      expect(cEvent.preventDefault).toHaveBeenCalled();
      expect(onStepComplete).toHaveBeenCalled();
    });

    test("should prevent default on sequenceComplete", () => {
      // ARRANGE
      const onSequenceComplete = vi.fn();
      _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
        onSequenceComplete,
        preventDefaultOn: "sequenceComplete",
      });

      // ACT
      const ctrlEvent = triggerKeydown("Control");
      const cEvent = triggerKeydown("c");

      // ASSERT
      expect(ctrlEvent.preventDefault).not.toHaveBeenCalled();
      expect(cEvent.preventDefault).toHaveBeenCalled();
      expect(onSequenceComplete).toHaveBeenCalled();
    });

    test("should not prevent default when set to 'none'", () => {
      // ARRANGE
      _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
        preventDefaultOn: "none",
      });

      // ACT
      const event = triggerKeydown("Control");

      // ASSERT
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    test("should stop propagation on stepComplete", () => {
      // ARRANGE
      const onStepComplete = vi.fn();
      _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }, { any: ["V"] }],
        onStepComplete,
        stopPropagationOn: "stepComplete",
      });

      // ACT
      const ctrlEvent = triggerKeydown("Control");
      const cEvent = triggerKeydown("c");

      // ASSERT
      expect(ctrlEvent.stopPropagation).not.toHaveBeenCalled();
      expect(cEvent.stopPropagation).toHaveBeenCalled();
    });
  });

  describe("disabled option", () => {
    test("should not trigger listeners when disabled", () => {
      // ARRANGE
      const onSequenceComplete = vi.fn();
      const { pressedKeys } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
        onSequenceComplete,
        disabled: true,
      });

      // ACT
      triggerKeydown("Control");
      triggerKeydown("c");

      // ASSERT
      expect(pressedKeys.value.size).toBe(0);
      expect(onSequenceComplete).not.toHaveBeenCalled();
    });

    test("should update behavior when disabled changes", () => {
      // ARRANGE
      const onSequenceComplete = vi.fn();
      const disabled = ref(false);
      const { pressedKeys } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
        onSequenceComplete,
        disabled,
      });

      // ACT - Initially enabled
      triggerKeydown("Control");
      triggerKeydown("c");

      // ASSERT
      expect(onSequenceComplete).toHaveBeenCalledOnce();
      expect(pressedKeys.value.size).toBe(2);

      // ACT - Disable
      disabled.value = true;
      vi.clearAllMocks();
      pressedKeys.value.clear();

      triggerKeydown("Control");
      triggerKeydown("c");

      // ASSERT
      expect(onSequenceComplete).not.toHaveBeenCalled();
      expect(pressedKeys.value.size).toBe(0);
    });
  });

  describe("listenOnRepeat option", () => {
    test("should ignore repeated keydown events by default", () => {
      // ARRANGE
      const onSequenceComplete = vi.fn();
      _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
        onSequenceComplete,
      });

      // ACT
      triggerKeydown("Control");
      triggerKeydown("c");
      triggerKeydown("c", undefined, true); // repeated event

      // ASSERT
      expect(onSequenceComplete).toHaveBeenCalledOnce();
    });

    test("should listen to repeated keydown events when enabled", () => {
      // ARRANGE
      const onSequenceComplete = vi.fn();
      _unstableUseShortcut({
        sequence: [{ any: ["ArrowDown", "ArrowUp"] }],
        onSequenceComplete,
        listenOnRepeat: true,
      });

      // ACT
      triggerKeydown("ArrowDown");
      triggerKeydown("ArrowDown", undefined, true); // repeated event

      // ASSERT
      expect(onSequenceComplete).toHaveBeenCalledTimes(2);

      // ACT
      triggerKeydown("ArrowUp");
      triggerKeydown("ArrowUp", undefined, true); // repeated event

      // ASSERT
      expect(onSequenceComplete).toHaveBeenCalledTimes(4);
    });
  });

  describe("cleanup delay", () => {
    test("should debounce cleanup function", () => {
      // ARRANGE
      const { pressedKeys, currentStepIndex } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
        cleanupDelay: 300,
      });

      // ACT
      triggerKeydown("Control");
      expect(pressedKeys.value.size).toBe(1);

      // ACT - Trigger keydown again before cleanup delay expires
      triggerKeydown("c");
      expect(pressedKeys.value.size).toBe(2);

      // Fast-forward time but not past cleanup delay
      vi.advanceTimersByTime(200);

      // ASSERT - Keys should still be present
      expect(pressedKeys.value.size).toBe(2);

      // ACT - Fast-forward past cleanup delay
      vi.advanceTimersByTime(100);

      // ASSERT - Keys should be cleared
      expect(pressedKeys.value.size).toBe(0);
      expect(currentStepIndex.value).toBe(0);
    });
  });

  describe("element prop", () => {
    test("should listen to events on specific element", () => {
      // ARRANGE
      const element = document.createElement("div");
      const onSequenceComplete = vi.fn();
      Object.defineProperty(document, "activeElement", {
        value: element,
        configurable: true,
      });

      const { pressedKeys } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
        onSequenceComplete,
        element,
      });

      // ACT
      triggerKeydown("Control");
      triggerKeydown("c");

      // ASSERT
      expect(pressedKeys.value.size).toBe(2);
      expect(onSequenceComplete).toHaveBeenCalledOnce();
    });
  });

  describe("window blur and focus cleanup", () => {
    test("should clear keys on window blur", () => {
      // ARRANGE
      const { pressedKeys, currentStepIndex } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
      });

      // ACT
      triggerKeydown("Control");
      triggerKeydown("c");
      expect(pressedKeys.value.size).toBe(2);

      // ACT - Trigger blur
      triggerBlur();

      // ASSERT
      expect(pressedKeys.value.size).toBe(0);
      expect(currentStepIndex.value).toBe(0);
    });

    test("should clear keys on window focus", () => {
      // ARRANGE
      const { pressedKeys, currentStepIndex } = _unstableUseShortcut({
        sequence: [{ all: ["Control", "C"] }],
      });

      // ACT
      triggerKeydown("Control");
      triggerKeydown("c");
      expect(pressedKeys.value.size).toBe(2);

      // ACT - Trigger focus
      triggerFocus();

      // ASSERT
      expect(pressedKeys.value.size).toBe(0);
      expect(currentStepIndex.value).toBe(0);
    });
  });
});
