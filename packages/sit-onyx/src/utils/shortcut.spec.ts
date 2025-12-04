import { describe, expect, it } from "vitest";
import {
  CANONICAL_KEYS,
  MAP_SPECIAL_KEY_TO_CANONICAL,
  getCanonicalKeyFromEvent,
  isAllStep,
  isAnyStep,
  isCanonicalSpecialKey,
  toCanonicalKey,
  type CanonicalKey,
  type ShortCutAllStep,
  type ShortCutAnyStep,
  type ShortcutStep,
} from "./shortcut.js";

describe("CANONICAL_KEYS", () => {
  it("should contain all expected special keys", () => {
    const expectedKeys = [
      "meta",
      "control",
      "alt",
      "option",
      "shift",
      "enter",
      "tab",
      "backspace",
      "caps-lock",
      "fn",
      "space",
      "esc",
      "up",
      "down",
      "left",
      "right",
      "delete",
      "home",
      "end",
      "page-up",
      "page-down",
      "unknown",
    ];

    expect(CANONICAL_KEYS).toEqual(expectedKeys);
  });
});

describe("toCanonicalKey", () => {
  it.each([
    // Empty/invalid inputs
    { input: "", expected: "unknown" },
    { input: "   ", expected: "unknown" },
    { input: " ", expected: "space" },

    // Meta/Command keys
    { input: "cmd", expected: "meta" },
    { input: "command", expected: "meta" },
    { input: "win", expected: "meta" },
    { input: "windows", expected: "meta" },
    { input: "meta", expected: "meta" },

    // Control keys
    { input: "control", expected: "control" },
    { input: "ctl", expected: "control" },
    { input: "ctrl", expected: "control" },
    { input: "CTRL", expected: "control" },

    // Alt/Option keys
    { input: "alt", expected: "alt" },
    { input: "option", expected: "option" },
    { input: "ALT", expected: "alt" },

    // Enter/Return
    { input: "return", expected: "enter" },
    { input: "enter", expected: "enter" },
    { input: "ENTER", expected: "enter" },

    // Backspace
    { input: "bksp", expected: "backspace" },
    { input: "back", expected: "backspace" },
    { input: "backspace", expected: "backspace" },

    // Caps Lock
    { input: "caps", expected: "caps-lock" },
    { input: "caps-lock", expected: "caps-lock" },

    // Escape
    { input: "esc", expected: "esc" },
    { input: "escape", expected: "esc" },

    // Tab
    { input: "tab", expected: "tab" },
    { input: "tabulator", expected: "tab" },

    // Space
    { input: "space", expected: "space" },

    // Delete
    { input: "del", expected: "delete" },
    { input: "delete", expected: "delete" },

    // Navigation
    { input: "home", expected: "home" },
    { input: "end", expected: "end" },
    { input: "pageup", expected: "page-up" },
    { input: "pagedown", expected: "page-down" },
    { input: "page-up", expected: "page-up" },
    { input: "page-down", expected: "page-down" },

    // Arrow keys
    { input: "up", expected: "up" },
    { input: "down", expected: "down" },
    { input: "left", expected: "left" },
    { input: "right", expected: "right" },
    { input: "arrowup", expected: "up" },
    { input: "arrowdown", expected: "down" },
    { input: "arrowleft", expected: "left" },
    { input: "arrowright", expected: "right" },
    { input: "↑", expected: "up" },
    { input: "↓", expected: "down" },
    { input: "←", expected: "left" },
    { input: "→", expected: "right" },

    // Function key
    { input: "fn", expected: "fn" },

    // Unknown
    { input: "unknown", expected: "unknown" },

    // Non-special keys (should be lowercased)
    { input: "A", expected: "a" },
    { input: "F1", expected: "F1" },
    { input: "1", expected: "1" },
    { input: "!", expected: "!" },
  ])("should normalize '$input' to '$expected'", ({ input, expected }) => {
    expect(toCanonicalKey(input)).toBe(expected);
  });
});

describe("isCanonicalSpecialKey", () => {
  it.each([
    { key: "meta", expected: true },
    { key: "control", expected: true },
    { key: "alt", expected: true },
    { key: "shift", expected: true },
    { key: "enter", expected: true },
    { key: "space", expected: true },
    { key: "up", expected: true },
    { key: "down", expected: true },
    { key: "left", expected: true },
    { key: "right", expected: true },
    { key: "unknown", expected: true },
  ])("should return $expected for canonical key '$key'", ({ key, expected }) => {
    expect(isCanonicalSpecialKey(key)).toBe(expected);
  });

  it.each([
    { key: "a", expected: false },
    { key: "F1", expected: false },
    { key: "1", expected: false },
    { key: "!", expected: false },
    { key: "ctrl", expected: false }, // This is not canonical (should be "control")
    { key: "", expected: false },
  ])("should return $expected for non-canonical key '$key'", ({ key, expected }) => {
    expect(isCanonicalSpecialKey(key)).toBe(expected);
  });
});

describe("getCanonicalKeyFromEvent", () => {
  const createKeyboardEvent = (key: string, code?: string): KeyboardEvent => {
    return new KeyboardEvent("keydown", { key, code });
  };

  it("should return 'unknown' for empty key", () => {
    const event = createKeyboardEvent("");
    expect(getCanonicalKeyFromEvent(event)).toBe("unknown");
  });

  it("should return 'space' for space character", () => {
    const event = createKeyboardEvent(" ");
    expect(getCanonicalKeyFromEvent(event)).toBe("space");
  });

  it.each([
    { key: "Control", expected: "control" },
    { key: "Shift", expected: "shift" },
    { key: "Alt", expected: "alt" },
    { key: "Meta", expected: "meta" },
    { key: "Enter", expected: "enter" },
    { key: "Tab", expected: "tab" },
    { key: "Escape", expected: "esc" },
    { key: "Backspace", expected: "backspace" },
    { key: "Delete", expected: "delete" },
    { key: "ArrowUp", expected: "up" },
    { key: "ArrowDown", expected: "down" },
    { key: "ArrowLeft", expected: "left" },
    { key: "ArrowRight", expected: "right" },
    { key: "Home", expected: "home" },
    { key: "End", expected: "end" },
    { key: "PageUp", expected: "page-up" },
    { key: "PageDown", expected: "page-down" },
  ])("should map special key '$key' to '$expected'", ({ key, expected }) => {
    const event = createKeyboardEvent(key);
    expect(getCanonicalKeyFromEvent(event)).toBe(expected);
  });

  it.each([
    { key: "@", code: "Digit2", expected: "2" },
    { key: "!", code: "Digit1", expected: "1" },
    { key: "#", code: "Digit3", expected: "3" },
    { key: "$", code: "Digit4", expected: "4" },
    { key: "%", code: "Digit5", expected: "5" },
    { key: "^", code: "Digit6", expected: "6" },
    { key: "&", code: "Digit7", expected: "7" },
    { key: "*", code: "Digit8", expected: "8" },
    { key: "(", code: "Digit9", expected: "9" },
    { key: ")", code: "Digit0", expected: "0" },
  ])(
    "should use code for digit keys: key='$key', code='$code' -> '$expected'",
    ({ key, code, expected }) => {
      const event = createKeyboardEvent(key, code);
      expect(getCanonicalKeyFromEvent(event)).toBe(expected);
    },
  );

  it.each([
    { key: "1", code: "Numpad1", expected: "1" },
    { key: "2", code: "Numpad2", expected: "2" },
    { key: "3", code: "Numpad3", expected: "3" },
    { key: "4", code: "Numpad4", expected: "4" },
    { key: "5", code: "Numpad5", expected: "5" },
    { key: "6", code: "Numpad6", expected: "6" },
    { key: "7", code: "Numpad7", expected: "7" },
    { key: "8", code: "Numpad8", expected: "8" },
    { key: "9", code: "Numpad9", expected: "9" },
    { key: "0", code: "Numpad0", expected: "0" },
  ])(
    "should handle numpad keys: key='$key', code='$code' -> '$expected'",
    ({ key, code, expected }) => {
      const event = createKeyboardEvent(key, code);
      expect(getCanonicalKeyFromEvent(event)).toBe(expected);
    },
  );

  it.each([
    { key: "F1", expected: "F1" },
    { key: "F2", expected: "F2" },
    { key: "F10", expected: "F10" },
    { key: "F12", expected: "F12" },
    { key: "f1", expected: "F1" },
    { key: "f12", expected: "F12" },
  ])("should handle function keys: '$key' -> '$expected'", ({ key, expected }) => {
    const event = createKeyboardEvent(key);
    expect(getCanonicalKeyFromEvent(event)).toBe(expected);
  });

  it.each([
    { key: "a", expected: "a" },
    { key: "Z", expected: "Z" },
    { key: "1", expected: "1" },
    { key: "!", expected: "!" },
    { key: "@", expected: "@" },
    { key: "?", expected: "?" },
  ])(
    "should pass through single printable characters: '$key' -> '$expected'",
    ({ key, expected }) => {
      const event = createKeyboardEvent(key);
      expect(getCanonicalKeyFromEvent(event)).toBe(expected);
    },
  );

  it("should fall back to toCanonicalKey for unknown multi-character keys", () => {
    const event = createKeyboardEvent("SomeUnknownKey");
    expect(getCanonicalKeyFromEvent(event)).toBe("someunknownkey");
  });
});

describe("isAllStep", () => {
  it("should return true for all steps", () => {
    const allStep: ShortCutAllStep = { all: ["ctrl", "c"] };
    expect(isAllStep(allStep)).toBe(true);
  });

  it("should return false for any steps", () => {
    const anyStep: ShortCutAnyStep = { any: ["enter", "space"] };
    expect(isAllStep(anyStep)).toBe(false);
  });
});

describe("isAnyStep", () => {
  it("should return true for any steps", () => {
    const anyStep: ShortCutAnyStep = { any: ["enter", "space"] };
    expect(isAnyStep(anyStep)).toBe(true);
  });

  it("should return false for all steps", () => {
    const allStep: ShortCutAllStep = { all: ["ctrl", "c"] };
    expect(isAnyStep(allStep)).toBe(false);
  });
});

describe("MAP_SPECIAL_KEY_TO_CANONICAL", () => {
  it("should contain all expected mappings", () => {
    // Test a few key mappings to ensure the map is correctly structured
    expect(MAP_SPECIAL_KEY_TO_CANONICAL["ctrl"]).toBe("control");
    expect(MAP_SPECIAL_KEY_TO_CANONICAL["cmd"]).toBe("meta");
    expect(MAP_SPECIAL_KEY_TO_CANONICAL["alt"]).toBe("alt");
    expect(MAP_SPECIAL_KEY_TO_CANONICAL["return"]).toBe("enter");
    expect(MAP_SPECIAL_KEY_TO_CANONICAL["esc"]).toBe("esc");
    expect(MAP_SPECIAL_KEY_TO_CANONICAL["arrowup"]).toBe("up");
    expect(MAP_SPECIAL_KEY_TO_CANONICAL["↑"]).toBe("up");
  });

  it("should have consistent values that are all canonical keys", () => {
    const values = Object.values(MAP_SPECIAL_KEY_TO_CANONICAL);
    values.forEach((value) => {
      expect(CANONICAL_KEYS).toContain(value as CanonicalKey);
    });
  });
});

describe("Type definitions", () => {
  it("should correctly type ShortcutStep union", () => {
    const allStep: ShortcutStep = { all: ["ctrl", "c"] };
    const anyStep: ShortcutStep = { any: ["enter", "space"] };

    // Type guards should work correctly
    if (isAllStep(allStep)) {
      expect(allStep.all).toEqual(["ctrl", "c"]);
    }

    if (isAnyStep(anyStep)) {
      expect(anyStep.any).toEqual(["enter", "space"]);
    }
  });
});
