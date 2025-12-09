import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { nextTick, ref } from "vue";
import type { ShortcutStep } from "../utils/shortcut.js";
import { _unstableUseShortcutSequence } from "./useShortcutSequence.js";

vi.mock("@sit-onyx/headless", () => ({
  useGlobalEventListener: vi.fn(),
}));

import { useGlobalEventListener } from "@sit-onyx/headless";
const mockUseGlobalEventListener = vi.mocked(useGlobalEventListener);

describe("useShortcutSequence", () => {
  let keydownListeners: ((event: KeyboardEvent) => void)[] = [];
  let keyupListeners: ((event: KeyboardEvent) => void)[] = [];
  let blurListeners: (() => void)[] = [];

  const createKeyboardEvent = (type: string, key: string, code?: string): KeyboardEvent => {
    const event = new KeyboardEvent(type, {
      key,
      code: code ?? key,
      bubbles: true,
      cancelable: true,
    });
    // Add preventDefault and stopPropagation spies
    vi.spyOn(event, "preventDefault");
    vi.spyOn(event, "stopPropagation");
    return event;
  };

  const triggerKeydown = (key: string, code?: string) => {
    const event = createKeyboardEvent("keydown", key, code);
    keydownListeners.forEach((listener) => listener(event));
    return event;
  };

  const triggerKeyup = (key: string, code?: string) => {
    const event = createKeyboardEvent("keyup", key, code);
    keyupListeners.forEach((listener) => listener(event));
    return event;
  };

  const triggerBlur = () => {
    blurListeners.forEach((listener) => listener());
  };

  beforeEach(() => {
    keydownListeners = [];
    keyupListeners = [];
    blurListeners = [];

    mockUseGlobalEventListener.mockImplementation((options) => {
      if (options.type === "keydown")
        keydownListeners.push(options.listener as (event: KeyboardEvent) => void);
      else if (options.type === "keyup")
        keyupListeners.push(options.listener as (event: KeyboardEvent) => void);
      else if (options.type === "blur") blurListeners.push(options.listener as () => void);
    });

    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("initialization", () => {
    test("should initialize with correct default values", () => {
      const listener = vi.fn();
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "c"] }];

      const { stepIndex, pressed, isHighlightedKey } = _unstableUseShortcutSequence({
        sequence,
        listener,
      });

      expect(stepIndex.value).toBe(0);
      expect(pressed.value.size).toBe(0);
      expect(typeof isHighlightedKey.value).toBe("function");
    });

    test("should register global event listeners", () => {
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "c"] }];
      _unstableUseShortcutSequence({ sequence });

      expect(mockUseGlobalEventListener).toHaveBeenCalledTimes(3);
      expect(mockUseGlobalEventListener).toHaveBeenCalledWith({
        type: "keydown",
        listener: expect.any(Function),
      });
      expect(mockUseGlobalEventListener).toHaveBeenCalledWith({
        type: "keyup",
        listener: expect.any(Function),
      });
      expect(mockUseGlobalEventListener).toHaveBeenCalledWith({
        type: "blur",
        listener: expect.any(Function),
      });
    });

    test("should handle reactive sequence", async () => {
      const sequence = ref<ShortcutStep[]>([{ all: ["ctrl", "c"] }]);
      const listener = vi.fn();

      const { stepIndex } = _unstableUseShortcutSequence({
        sequence,
        listener,
      });

      // Change sequence
      sequence.value = [{ all: ["ctrl", "x"] }, { any: ["v"] }];
      await nextTick();

      // Should still be at step 0
      expect(stepIndex.value).toBe(0);
    });
  });

  describe("single step sequences", () => {
    test("should handle single 'all' step shortcut", () => {
      const listener = vi.fn();
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "c"] }];

      const { stepIndex, pressed, isHighlightedKey } = _unstableUseShortcutSequence({
        sequence,
        listener,
      });

      // Press Ctrl
      triggerKeydown("Control");
      expect(pressed.value.has("control")).toBe(true);
      expect(stepIndex.value).toBe(0);
      expect(listener).not.toHaveBeenCalled();

      // Press C - should complete sequence
      triggerKeydown("c");
      expect(pressed.value.has("c")).toBe(true);
      expect(listener).toHaveBeenCalledOnce();

      // Check highlighting
      expect(isHighlightedKey.value("ctrl", 0)).toBe(true);
      expect(isHighlightedKey.value("c", 0)).toBe(true);
    });

    test("should handle single 'any' step shortcut", () => {
      const listener = vi.fn();
      const sequence: ShortcutStep[] = [{ any: ["enter", "space"] }];

      const { pressed } = _unstableUseShortcutSequence({
        sequence,
        listener,
      });

      // Press Enter - should complete sequence immediately
      triggerKeydown("Enter");
      expect(pressed.value.has("enter")).toBe(true);
      expect(listener).toHaveBeenCalledOnce();
    });

    test("should ignore irrelevant keys", () => {
      const listener = vi.fn();
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "c"] }];

      const { pressed } = _unstableUseShortcutSequence({
        sequence,
        listener,
      });

      // Press irrelevant key
      triggerKeydown("x");
      expect(pressed.value.has("x")).toBe(true);
      expect(listener).not.toHaveBeenCalled();

      // Press relevant keys
      triggerKeydown("Control");
      triggerKeydown("c");
      expect(listener).toHaveBeenCalledOnce();
    });
  });

  describe("multi-step sequences", () => {
    test("should handle multi-step sequence", () => {
      const listener = vi.fn();
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "c"] }, { any: ["v", "insert"] }];

      const { stepIndex } = _unstableUseShortcutSequence({
        sequence,
        listener,
      });

      // First step: Ctrl+C
      triggerKeydown("Control");
      triggerKeydown("c");
      expect(stepIndex.value).toBe(1);
      expect(listener).not.toHaveBeenCalled();

      // Second step: V
      triggerKeydown("v");
      expect(listener).toHaveBeenCalledOnce();
    });

    test("should reset sequence on timeout", () => {
      const listener = vi.fn();
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "c"] }, { any: ["v"] }];

      const { stepIndex } = _unstableUseShortcutSequence({
        sequence,
        listener,
        stepTimeout: 500,
      });

      // Complete first step
      triggerKeydown("Control");
      triggerKeydown("c");
      expect(stepIndex.value).toBe(1);

      // Fast-forward time to trigger timeout
      vi.advanceTimersByTime(500);
      expect(stepIndex.value).toBe(0);
      expect(listener).not.toHaveBeenCalled();
    });

    test("should clear timeout when continuing sequence", () => {
      const listener = vi.fn();
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "c"] }, { any: ["v"] }];

      const { stepIndex } = _unstableUseShortcutSequence({
        sequence,
        listener,
        stepTimeout: 500,
      });

      // Complete first step
      triggerKeydown("Control");
      triggerKeydown("c");
      expect(stepIndex.value).toBe(1);

      // Timeout should not reset after completion
      vi.advanceTimersByTime(500);

      expect(stepIndex.value).toBe(0);

      triggerKeydown("Control");
      triggerKeydown("c");
      expect(stepIndex.value).toBe(1);

      //    Continue before timeout
      vi.advanceTimersByTime(200);
      triggerKeydown("v");
      expect(listener).toHaveBeenCalledOnce();

      triggerKeyup("Control");
      triggerKeyup("c");
      triggerKeyup("v");

      expect(stepIndex.value).toBe(0);
    });
  });

  describe("event handling options", () => {
    test("should preventDefault by default", () => {
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "c"] }];
      _unstableUseShortcutSequence({ sequence });

      triggerKeydown("Control");
      const event = triggerKeydown("c");

      expect(event.preventDefault).toHaveBeenCalled();
    });

    test("should not preventDefault when disabled", () => {
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "c"] }];
      _unstableUseShortcutSequence({
        sequence,
        preventDefault: false,
      });

      triggerKeydown("Control");
      const event = triggerKeydown("c");

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    test("should stopPropagation when enabled", () => {
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "c"] }];
      _unstableUseShortcutSequence({
        sequence,
        stopPropagation: true,
      });

      triggerKeydown("Control");
      const event = triggerKeydown("c");

      expect(event.stopPropagation).toHaveBeenCalled();
    });

    test("should not stopPropagation by default", () => {
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "c"] }];
      _unstableUseShortcutSequence({ sequence });

      triggerKeydown("Control");
      const event = triggerKeydown("c");

      expect(event.stopPropagation).not.toHaveBeenCalled();
    });
  });

  describe("key highlighting", () => {
    test("should highlight pressed keys correctly", () => {
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "c"] }];
      const { isHighlightedKey } = _unstableUseShortcutSequence({ sequence });

      // No keys pressed initially
      expect(isHighlightedKey.value("ctrl", 0)).toBe(false);

      // Press Ctrl
      triggerKeydown("Control");
      expect(isHighlightedKey.value("ctrl", 0)).toBe(true);
      expect(isHighlightedKey.value("c", 0)).toBe(false);

      // Press C
      triggerKeydown("c");
      expect(isHighlightedKey.value("ctrl", 0)).toBe(true);
      expect(isHighlightedKey.value("c", 0)).toBe(true);
    });

    test("should handle key ownership in multi-step sequences", () => {
      const sequence: ShortcutStep[] = [{ all: ["ctrl"] }, { all: ["ctrl", "c"] }];
      const { isHighlightedKey, stepIndex } = _unstableUseShortcutSequence({ sequence });

      // First step: Ctrl
      triggerKeydown("Control");
      expect(isHighlightedKey.value("ctrl", 0)).toBe(true);
      expect(stepIndex.value).toBe(1);

      // Second step: Ctrl+C (Ctrl already pressed)
      triggerKeydown("c");
      // Ctrl should still be highlighted for step 0 (ownership)
      expect(isHighlightedKey.value("ctrl", 0)).toBe(true);
      expect(isHighlightedKey.value("ctrl", 1)).toBe(false);
    });
  });

  describe("key release handling", () => {
    test("should remove keys from pressed set on keyup", () => {
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "c"] }];
      const { pressed } = _unstableUseShortcutSequence({ sequence });

      triggerKeydown("Control");
      expect(pressed.value.has("control")).toBe(true);

      triggerKeyup("Control");
      expect(pressed.value.has("control")).toBe(false);
    });

    test("should reset sequence after completion when all keys released", () => {
      const listener = vi.fn();
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "c"] }];
      const { stepIndex, pressed } = _unstableUseShortcutSequence({
        sequence,
        listener,
      });

      // Complete sequence
      triggerKeydown("Control");
      triggerKeydown("c");
      expect(listener).toHaveBeenCalledOnce();

      // Release one key
      triggerKeyup("c");
      expect(stepIndex.value).toBe(0); // Should still be completed

      // Release all keys
      triggerKeyup("Control");
      expect(pressed.value.size).toBe(0);
      expect(stepIndex.value).toBe(0);
    });

    test("should handle meta/control key edge case", () => {
      const sequence: ShortcutStep[] = [{ all: ["meta", "c"] }];
      const { pressed } = _unstableUseShortcutSequence({ sequence });

      triggerKeydown("Meta");
      triggerKeydown("c");
      triggerKeydown("x"); // Random key

      expect(pressed.value.size).toBe(3);

      // Release meta key - should clear all sets
      triggerKeyup("Meta");
      expect(pressed.value.size).toBe(0);
    });
  });

  describe("blur handling", () => {
    test("should reset all state on blur", () => {
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "c"] }, { any: ["v"] }];
      const { stepIndex, pressed } = _unstableUseShortcutSequence({ sequence });

      // Partially complete sequence
      triggerKeydown("Control");
      triggerKeydown("c");
      expect(stepIndex.value).toBe(1);
      expect(pressed.value.size).toBe(2);

      // Blur should reset everything
      triggerBlur();
      expect(stepIndex.value).toBe(0);
      expect(pressed.value.size).toBe(0);
    });
  });

  describe("edge cases", () => {
    test("should handle empty sequence", () => {
      const listener = vi.fn();
      const sequence: ShortcutStep[] = [];
      const { stepIndex } = _unstableUseShortcutSequence({
        sequence,
        listener,
      });

      triggerKeydown("Control");
      expect(stepIndex.value).toBe(0);
      expect(listener).not.toHaveBeenCalled();
    });

    test("should handle mixed all/any steps", () => {
      const listener = vi.fn();
      const sequence: ShortcutStep[] = [
        { all: ["ctrl"], any: ["c", "x"] }, // Step that has both all and any
      ];
      const { stepIndex } = _unstableUseShortcutSequence({
        sequence,
        listener,
      });

      // Should prioritize 'all' keys
      triggerKeydown("Control");
      expect(stepIndex.value).toBe(0);
      expect(listener).toHaveBeenCalledOnce();
    });

    test("should handle reactive options", async () => {
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "c"] }];
      const preventDefault = ref(false);
      const stopPropagation = ref(false);

      _unstableUseShortcutSequence({
        sequence,
        preventDefault,
        stopPropagation,
      });

      triggerKeydown("Control");
      let event = triggerKeydown("c");
      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(event.stopPropagation).not.toHaveBeenCalled();

      // Change options
      preventDefault.value = true;
      stopPropagation.value = true;
      await nextTick();

      triggerKeydown("Control");
      event = triggerKeydown("c");
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    test("should handle digit keys with layout-specific symbols", () => {
      const listener = vi.fn();
      const sequence: ShortcutStep[] = [{ all: ["ctrl", "2"] }];
      _unstableUseShortcutSequence({ sequence, listener });

      // Shift+2 might produce "@" but code is "Digit2"
      triggerKeydown("Control");
      triggerKeydown("@", "Digit2");
      expect(listener).toHaveBeenCalledOnce();
    });
  });
});
