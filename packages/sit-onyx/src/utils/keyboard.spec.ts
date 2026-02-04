import { describe, expect, test } from "vitest";
import { keyboardEventToKey, type KeyboardKey } from "./keyboard.js";

const createKeyboardEvent = (key: string, code?: string) => {
  return new KeyboardEvent("keydown", { key, code });
};

describe("keyboardEventToKey", () => {
  describe("Numeric keys (0-9)", () => {
    test.each([
      // Direct key property
      { key: "0", code: undefined, expected: "0" },
      { key: "5", code: undefined, expected: "5" },
      { key: "9", code: undefined, expected: "9" },
      // Via DigitX code fallback
      { key: "0", code: "Digit0", expected: "0" },
      { key: "!", code: "Digit1", expected: "1" },
      { key: "@", code: "Digit2", expected: "2" },
      { key: "9", code: "Digit9", expected: "9" },
    ] as const)(
      "should return $expected for key '$key' with code '$code'",
      ({ key, code, expected }) => {
        // ACT
        const result = keyboardEventToKey(createKeyboardEvent(key, code));

        // ASSERT
        expect(result).toBe(expected);
      },
    );
  });

  describe("Alphabetic keys (A-Z)", () => {
    test.each([
      // Uppercase letters
      { key: "A", expected: "A" },
      { key: "M", expected: "M" },
      { key: "Z", expected: "Z" },
      // Lowercase to uppercase normalization
      { key: "a", expected: "A" },
      { key: "m", expected: "M" },
      { key: "z", expected: "Z" },
    ] as const)("should return $expected for key '$key'", ({ key, expected }) => {
      // ACT
      const result = keyboardEventToKey(createKeyboardEvent(key));

      // ASSERT
      expect(result).toBe(expected);
    });
  });

  describe("Symbol keys", () => {
    test.each([
      // Space special case
      { key: " ", expected: "Space" },
      // Common symbols
      { key: "!", expected: "!" },
      { key: "@", expected: "@" },
      { key: "#", expected: "#" },
      { key: "$", expected: "$" },
      { key: "%", expected: "%" },
      { key: "^", expected: "^" },
      { key: "&", expected: "&" },
      { key: "*", expected: "*" },
      { key: "(", expected: "(" },
      { key: ")", expected: ")" },
      // Punctuation symbols
      { key: "-", expected: "-" },
      { key: "_", expected: "_" },
      { key: "=", expected: "=" },
      { key: "+", expected: "+" },
      { key: "[", expected: "[" },
      { key: "]", expected: "]" },
      { key: "{", expected: "{" },
      { key: "}", expected: "}" },
      { key: ";", expected: ";" },
      { key: ":", expected: ":" },
      { key: "'", expected: "'" },
      { key: '"', expected: '"' },
      { key: ",", expected: "," },
      { key: ".", expected: "." },
      { key: "/", expected: "/" },
      { key: "?", expected: "?" },
      { key: "`", expected: "`" },
      { key: "~", expected: "~" },
      { key: "\\", expected: "\\" },
    ] as const)("should return $expected for key '$key'", ({ key, expected }) => {
      // ACT
      const result = keyboardEventToKey(createKeyboardEvent(key));

      // ASSERT
      expect(result).toBe(expected);
    });
  });

  describe("Navigation keys", () => {
    test.each([
      // Arrow keys
      { key: "ArrowUp", expected: "ArrowUp" },
      { key: "ArrowDown", expected: "ArrowDown" },
      { key: "ArrowLeft", expected: "ArrowLeft" },
      { key: "ArrowRight", expected: "ArrowRight" },
      // Page navigation
      { key: "Home", expected: "Home" },
      { key: "End", expected: "End" },
      { key: "PageUp", expected: "PageUp" },
      { key: "PageDown", expected: "PageDown" },
      // Case-insensitive
      { key: "arrowup", expected: "ArrowUp" },
      { key: "home", expected: "Home" },
      { key: "PAGEDOWN", expected: "PageDown" },
    ] as const)("should return $expected for key '$key'", ({ key, expected }) => {
      // ACT
      const result = keyboardEventToKey(createKeyboardEvent(key));

      // ASSERT
      expect(result).toBe(expected);
    });
  });

  describe("Editing keys", () => {
    test.each([
      // Standard editing keys
      { key: "Backspace", expected: "Backspace" },
      { key: "Delete", expected: "Delete" },
      { key: "Insert", expected: "Insert" },
      { key: "Enter", expected: "Enter" },
      { key: "Tab", expected: "Tab" },
      { key: "Escape", expected: "Escape" },
      // Case-insensitive
      { key: "backspace", expected: "Backspace" },
      { key: "ENTER", expected: "Enter" },
      { key: "escape", expected: "Escape" },
    ] as const)("should return $expected for key '$key'", ({ key, expected }) => {
      // ACT
      const result = keyboardEventToKey(createKeyboardEvent(key));

      // ASSERT
      expect(result).toBe(expected);
    });
  });

  describe("Modifier keys", () => {
    test.each([
      // Standard modifiers
      { key: "Shift", expected: "Shift" },
      { key: "Control", expected: "Control" },
      { key: "Alt", expected: "Alt" },
      { key: "Meta", expected: "Meta" },
      { key: "AltGraph", expected: "AltGraph" },
      { key: "CapsLock", expected: "CapsLock" },
      { key: "NumLock", expected: "NumLock" },
      { key: "ScrollLock", expected: "ScrollLock" },
      // Case-insensitive
      { key: "shift", expected: "Shift" },
      { key: "CONTROL", expected: "Control" },
      { key: "alt", expected: "Alt" },
    ] as const)("should return $expected for key '$key'", ({ key, expected }) => {
      // ACT
      const result = keyboardEventToKey(createKeyboardEvent(key));

      // ASSERT
      expect(result).toBe(expected);
    });
  });

  describe("Function keys (F1-F12)", () => {
    test.each([
      // Standard function keys
      { key: "F1", expected: "F1" },
      { key: "F5", expected: "F5" },
      { key: "F12", expected: "F12" },
      // Lowercase
      { key: "f1", expected: "F1" },
      { key: "f10", expected: "F10" },
      { key: "f12", expected: "F12" },
      // Invalid function keys
      { key: "F13", expected: "unknown" },
      { key: "F0", expected: "unknown" },
      { key: "F99", expected: "unknown" },
    ] as const)("should return $expected for key '$key'", ({ key, expected }) => {
      // ACT
      const result = keyboardEventToKey(createKeyboardEvent(key));

      // ASSERT
      expect(result).toBe(expected);
    });
  });

  describe("Numpad keys", () => {
    test.each([
      // Numpad numbers via code
      { key: "0", code: "Numpad0", expected: "Numpad0" },
      { key: "5", code: "Numpad5", expected: "Numpad5" },
      { key: "9", code: "Numpad9", expected: "Numpad9" },
      // Numpad operations via code
      { key: "+", code: "NumpadAdd", expected: "NumpadAdd" },
      { key: "-", code: "NumpadSubtract", expected: "NumpadSubtract" },
      { key: "*", code: "NumpadMultiply", expected: "NumpadMultiply" },
      { key: "/", code: "NumpadDivide", expected: "NumpadDivide" },
      { key: ".", code: "NumpadDecimal", expected: "NumpadDecimal" },
      { key: "Enter", code: "NumpadEnter", expected: "NumpadEnter" },
      // Direct numpad key values
      { key: "Numpad0", code: undefined, expected: "Numpad0" },
      { key: "NumpadAdd", code: undefined, expected: "NumpadAdd" },
      { key: "NumpadEnter", code: undefined, expected: "NumpadEnter" },
    ] as const)(
      "should return $expected for key '$key' with code '$code'",
      ({ key, code, expected }) => {
        // ACT
        const result = keyboardEventToKey(createKeyboardEvent(key, code));

        // ASSERT
        expect(result).toBe(expected);
      },
    );
  });

  describe("Media keys", () => {
    test.each([
      // Standard media keys
      { key: "AudioVolumeMute", expected: "AudioVolumeMute" },
      { key: "AudioVolumeDown", expected: "AudioVolumeDown" },
      { key: "AudioVolumeUp", expected: "AudioVolumeUp" },
      { key: "MediaTrackNext", expected: "MediaTrackNext" },
      { key: "MediaTrackPrevious", expected: "MediaTrackPrevious" },
      { key: "MediaStop", expected: "MediaStop" },
      { key: "MediaPlayPause", expected: "MediaPlayPause" },
      // Case-insensitive
      { key: "audiovolumemute", expected: "AudioVolumeMute" },
      { key: "MEDIATRACKNEXT", expected: "MediaTrackNext" },
    ] as const)("should return $expected for key '$key'", ({ key, expected }) => {
      // ACT
      const result = keyboardEventToKey(createKeyboardEvent(key));

      // ASSERT
      expect(result).toBe(expected);
    });
  });

  describe("Misc keys", () => {
    test.each([
      // Standard misc keys
      { key: "PrintScreen", expected: "PrintScreen" },
      { key: "Pause", expected: "Pause" },
      { key: "ContextMenu", expected: "ContextMenu" },
      { key: "Clear", expected: "Clear" },
      { key: "Select", expected: "Select" },
      { key: "Undo", expected: "Undo" },
      { key: "Redo", expected: "Redo" },
      { key: "Help", expected: "Help" },
      // Case-insensitive
      { key: "printscreen", expected: "PrintScreen" },
      { key: "CONTEXTMENU", expected: "ContextMenu" },
    ] as const)("should return $expected for key '$key'", ({ key, expected }) => {
      // ACT
      const result = keyboardEventToKey(createKeyboardEvent(key));

      // ASSERT
      expect(result).toBe(expected);
    });
  });

  describe("Edge cases and unknown keys", () => {
    test.each([
      // Empty and unrecognized keys
      { key: "", code: undefined, expected: "unknown", description: "empty key" },
      { key: "UnknownKey", code: undefined, expected: "unknown", description: "unrecognized key" },
      { key: "RandomString", code: undefined, expected: "unknown", description: "random string" },
      { key: "🎉", code: undefined, expected: "unknown", description: "emoji" },
      // Multi-character non-keyboard strings
      { key: "ABC", code: undefined, expected: "unknown", description: "multi-char uppercase" },
      { key: "hello", code: undefined, expected: "unknown", description: "multi-char lowercase" },
      // Invalid Digit codes
      { key: "x", code: "DigitA", expected: "unknown", description: "invalid DigitA code" },
      { key: "y", code: "Digit", expected: "unknown", description: "incomplete Digit code" },
      { key: "z", code: "Digit99", expected: "unknown", description: "invalid Digit99 code" },
      // Invalid Numpad codes
      { key: "x", code: "NumpadInvalid", expected: "unknown", description: "invalid Numpad code" },
      { key: "y", code: "Numpad99", expected: "unknown", description: "invalid Numpad99 code" },
      // Browser-specific variations
      { key: "Esc", code: undefined, expected: "unknown", description: "browser Esc variant" },
      { key: "Del", code: undefined, expected: "unknown", description: "browser Del variant" },
      {
        key: "Spacebar",
        code: undefined,
        expected: "unknown",
        description: "browser Spacebar variant",
      },
      // Dead keys and composition
      { key: "Dead", code: undefined, expected: "unknown", description: "dead key" },
      {
        key: "Unidentified",
        code: undefined,
        expected: "unknown",
        description: "unidentified key",
      },
      // Legacy key codes
      { key: "Left", code: undefined, expected: "unknown", description: "legacy Left" },
      { key: "Right", code: undefined, expected: "unknown", description: "legacy Right" },
      { key: "Up", code: undefined, expected: "unknown", description: "legacy Up" },
      { key: "Down", code: undefined, expected: "unknown", description: "legacy Down" },
      // International layouts
      { key: "ä", code: "KeyA", expected: "unknown", description: "German umlaut" },
      { key: "é", code: "KeyE", expected: "unknown", description: "French accent" },
    ] as const)("should return $expected for $description", ({ key, code, expected }) => {
      // ACT
      const result = keyboardEventToKey(createKeyboardEvent(key, code));

      // ASSERT
      expect(result).toBe(expected);
    });

    test("should return unknown for events without key property", () => {
      // ARRANGE
      const event = new KeyboardEvent("keydown", { code: "KeyA" });

      // ACT
      const result = keyboardEventToKey(event);

      // ASSERT
      expect(result).toBe("unknown" as KeyboardKey);
    });
  });

  describe("Case sensitivity and priority", () => {
    test.each([
      // Mixed case normalization
      { key: "aRrOwUp", expected: "ArrowUp", description: "mixed case arrow" },
      { key: "cOnTrOl", expected: "Control", description: "mixed case control" },
      { key: "BaCkSpAcE", expected: "Backspace", description: "mixed case backspace" },
      // Single character case preservation/normalization
      { key: "A", expected: "A", description: "uppercase A" },
      { key: "a", expected: "A", description: "lowercase a to uppercase" },
      { key: "!", expected: "!", description: "symbol unchanged" },
    ] as const)("should return $expected for $description", ({ key, expected }) => {
      // ACT
      const result = keyboardEventToKey(createKeyboardEvent(key));

      // ASSERT
      expect(result).toBe(expected);
    });
  });

  describe("Code fallback scenarios", () => {
    test.each([
      // Ambiguous key with code fallback
      { key: "Process", code: "Digit5", expected: "5", description: "Process with Digit5" },
      { key: "Process", code: "Numpad3", expected: "Numpad3", description: "Process with Numpad3" },
      // Key/code priority conflicts (Digit code takes precedence)
      { key: "!", code: "Digit1", expected: "1", description: "symbol ! with Digit1 code" },
      { key: "@", code: "Digit2", expected: "2", description: "symbol @ with Digit2 code" },
    ] as const)("should return $expected for $description", ({ key, code, expected }) => {
      // ACT
      const result = keyboardEventToKey(createKeyboardEvent(key, code));

      // ASSERT
      expect(result).toBe(expected);
    });
  });
});
