import {
  ALPHABETIC_KEYS,
  EDITING_KEYS,
  FUNCTION_KEYS,
  MEDIA_KEYS,
  MISC_KEYS,
  MODIFIER_KEYS,
  NAVIGATION_KEYS,
  NUMERIC_KEYS,
  NUMPAD_KEYS,
  SYMBOL_KEYS,
  type AlphabeticKey,
  type EditingKey,
  type FunctionKey,
  type KeyboardKey,
  type MediaKey,
  type MiscKey,
  type ModifierKey,
  type NavigationKey,
  type NumericKey,
  type NumpadKey,
  type SymbolKey,
} from "../components/OnyxKey/types.js";

export type ShortCutAllStep = {
  /**
   * Shortcut step that requires all keys to be pressed.
   * For example, Ctrl + S would be represented as `{ all: ["Control", "S"] }`.
   */
  all: KeyboardKey[];
};

export type ShortCutAnyStep = {
  /**
   * Shortcut step that requires any one of the keys to be pressed.
   * For example, Ctrl or Command would be represented as `{ any: ["Control", "Meta"] }`.
   */
  any: KeyboardKey[];
};

/**
 * A shortcut step can be either an `all` step or an `any` step.
 */
export type ShortcutStep = (ShortCutAllStep | ShortCutAnyStep) & {};

export const isAllStep = (step: ShortcutStep): step is ShortCutAllStep => "all" in step;

export const isAnyStep = (step: ShortcutStep): step is ShortCutAnyStep => "any" in step;

export const isAlphabeticKey = (key: string): key is AlphabeticKey =>
  ALPHABETIC_KEYS.includes(key as AlphabeticKey);

export const isSymbolKey = (key: string): key is SymbolKey =>
  SYMBOL_KEYS.includes(key as SymbolKey);

export const isNavigationKey = (key: string): key is NavigationKey =>
  NAVIGATION_KEYS.includes(key as NavigationKey);

export const isEditingKey = (key: string): key is EditingKey =>
  EDITING_KEYS.includes(key as EditingKey);

export const isModifierKey = (key: string): key is ModifierKey =>
  MODIFIER_KEYS.includes(key as ModifierKey);

export const isFunctionalKey = (key: string): key is FunctionKey =>
  FUNCTION_KEYS.includes(key as FunctionKey);

export const isNumpadKey = (key: string): key is NumpadKey =>
  NUMPAD_KEYS.includes(key as NumpadKey);

export const isNumericKey = (key: string): key is NumericKey =>
  NUMERIC_KEYS.includes(key as NumericKey);

export const isMediaKey = (key: string): key is MediaKey => MEDIA_KEYS.includes(key as MediaKey);

export const isMiscKey = (key: string): key is MiscKey => MISC_KEYS.includes(key as MiscKey);

/**
 * Gets and maps the normalized keyboard key from a KeyboardEvent (e.g. emitted by a keyup or keydown event).
 */
export const keyboardEventToKey = (event: KeyboardEvent): KeyboardKey => {
  const { key, code } = event;
  if (!key) return "unknown";
  if (key === " ") return "Space";

  // Priority 1: DIGIT KEYS (DigitX) - override symbols like ! @ #
  // e.g. "Digit0", "Digit1", ..., "Digit9"
  if (code.startsWith("Digit")) {
    const digit = code.slice(5); // may be "0", "1", or garbage e.g. "A", "99"
    return isNumericKey(digit) ? digit : "unknown";
  }

  // Priority 2: NUMPAD KEYS (ALWAYS override symbols)
  // e.g. "Numpad0", "Numpad1", ..., "NumpadAdd", etc.
  if (code.startsWith("Numpad")) {
    return isNumpadKey(code) ? code : "unknown";
  }

  // Priority 3: FUNCTION KEYS (F1–F12), case-insensitive
  // e.g. "F1", "F2", ..., "F12"
  if (/^F[1-9][0-9]?$/i.test(key)) {
    const fKey = key.toUpperCase();
    return isFunctionalKey(fKey) ? fKey : "unknown";
  }

  // Priority 4: NUMERIC KEYS (0-9) without code
  // e.g. "0", "1", ..., "9"
  if (isNumericKey(key)) return key;

  // Priority 5: A–Z letters
  // e.g. "A", "B", ..., "Z" (case-insensitive)
  const upperCaseKey = key.toUpperCase();
  if (isAlphabeticKey(upperCaseKey)) return upperCaseKey;

  // Priority 6: symbol keys
  // e.g. "!", "@", "#", etc.
  if (isSymbolKey(key)) return key;

  // Priority 7: multi-character special keys
  // e.g. "ArrowUp", "Backspace", "Shift", "VolumeUp", "F1", etc.
  const categoryLookups = [
    { guard: isNavigationKey, keys: NAVIGATION_KEYS },
    { guard: isEditingKey, keys: EDITING_KEYS },
    { guard: isModifierKey, keys: MODIFIER_KEYS },
    { guard: isMediaKey, keys: MEDIA_KEYS },
    { guard: isMiscKey, keys: MISC_KEYS },
    { guard: isNumpadKey, keys: NUMPAD_KEYS },
  ];

  // Try exact match first
  for (const { guard } of categoryLookups) {
    if (guard(key)) return key;
  }

  // Try finding the correct casing by checking all keys in each category
  const lowerCaseKey = key.toLowerCase();

  for (const { keys } of categoryLookups) {
    // Find case-insensitive match
    const keyMatch = keys.find((key) => key.toLowerCase() === lowerCaseKey);
    if (keyMatch) return keyMatch;
  }

  // Priority 8: fallback
  return "unknown";
};
