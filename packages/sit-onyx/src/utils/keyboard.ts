export const NUMERIC_KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
export type NumericKey = (typeof NUMERIC_KEYS)[number];

export const ALPHABETIC_KEYS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
] as const;
export type AlphabeticKey = (typeof ALPHABETIC_KEYS)[number];

export const SYMBOL_KEYS = [
  "Space",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "[",
  "]",
  "{",
  "}",
  ";",
  ":",
  "'",
  '"',
  ",",
  ".",
  "/",
  "?",
  "`",
  "~",
  "\\",
] as const;
export type SymbolKey = (typeof SYMBOL_KEYS)[number];

export const NAVIGATION_KEYS = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
  "PageUp",
  "PageDown",
] as const;
export type NavigationKey = (typeof NAVIGATION_KEYS)[number];

export const EDITING_KEYS = ["Backspace", "Delete", "Insert", "Enter", "Tab", "Escape"] as const;
export type EditingKey = (typeof EDITING_KEYS)[number];

export const MODIFIER_KEYS = [
  "Shift",
  "Control",
  "Alt",
  "Meta",
  "AltGraph",
  "CapsLock",
  "NumLock",
  "ScrollLock",
] as const;
export type ModifierKey = (typeof MODIFIER_KEYS)[number];

export const FUNCTION_KEYS = [
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
  "FN",
] as const;
export type FunctionKey = (typeof FUNCTION_KEYS)[number];

export const NUMPAD_KEYS = [
  "Numpad0",
  "Numpad1",
  "Numpad2",
  "Numpad3",
  "Numpad4",
  "Numpad5",
  "Numpad6",
  "Numpad7",
  "Numpad8",
  "Numpad9",
  "NumpadAdd",
  "NumpadSubtract",
  "NumpadMultiply",
  "NumpadDivide",
  "NumpadDecimal",
  "NumpadEnter",
] as const;
export type NumpadKey = (typeof NUMPAD_KEYS)[number];

export const MEDIA_KEYS = [
  "AudioVolumeMute",
  "AudioVolumeDown",
  "AudioVolumeUp",
  "MediaTrackNext",
  "MediaTrackPrevious",
  "MediaStop",
  "MediaPlayPause",
] as const;
export type MediaKey = (typeof MEDIA_KEYS)[number];

export const MISC_KEYS = [
  "PrintScreen",
  "Pause",
  "ContextMenu",
  "Clear",
  "Select",
  "Undo",
  "Redo",
  "Help",
] as const;
export type MiscKey = (typeof MISC_KEYS)[number];

export type KeyboardKey =
  | NumericKey
  | AlphabeticKey
  | SymbolKey
  | NavigationKey
  | EditingKey
  | ModifierKey
  | FunctionKey
  | NumpadKey
  | MediaKey
  | MiscKey
  | "unknown";

/**
 * Uses Unicode characters from tables.
 *
 * https://acrobatfaq.com/atbref10/index/Keyboard_Shortcuts/Unicode_Codes_for_Keyboard_symbols.html
 */
export const MAC_KEY_SYMBOLS: Partial<Record<KeyboardKey, string>> = {
  // Modifiers
  Shift: "⇧",
  Control: "⌃",
  Alt: "⌥",
  AltGraph: "⌥",
  Meta: "⌘",
  CapsLock: "⇪",
  NumLock: "Num Lock",
  ScrollLock: "Scroll Lock",

  // Editing
  Backspace: "⌫",
  Delete: "⌦",
  Enter: "↩",
  Tab: "⇥",
  Escape: "⎋",
  Insert: "Insert",

  // Navigation
  ArrowUp: "▴",
  ArrowDown: "▾",
  ArrowLeft: "◂",
  ArrowRight: "▸",
  Home: "⇱",
  End: "⇲",
  PageUp: "⇞",
  PageDown: "⇟",

  // Space
  Space: "␣",

  // Function keys
  F1: "F1",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  FN: "fn",

  // Numpad
  Numpad0: "0",
  Numpad1: "1",
  Numpad2: "2",
  Numpad3: "3",
  Numpad4: "4",
  Numpad5: "5",
  Numpad6: "6",
  Numpad7: "7",
  Numpad8: "8",
  Numpad9: "9",
  NumpadAdd: "+",
  NumpadSubtract: "−",
  NumpadMultiply: "×",
  NumpadDivide: "÷",
  NumpadDecimal: "․",
  NumpadEnter: "↩",

  // Media
  AudioVolumeMute: "Mute",
  AudioVolumeDown: "Vol ↓",
  AudioVolumeUp: "Vol ↑",
  MediaTrackNext: "Next",
  MediaTrackPrevious: "Prev",
  MediaStop: "Stop",
  MediaPlayPause: "Play/Pause",

  // Misc
  PrintScreen: "Print Screen",
  Pause: "Pause",
  ContextMenu: "Menu",
  Clear: "Clear",
  Select: "Select",
  Undo: "Undo",
  Redo: "Redo",
  Help: "Help",
};

export const WINDOWS_KEY_SYMBOLS: Partial<Record<KeyboardKey, string>> = {
  // Modifiers
  Shift: "⇧",
  Control: "Ctrl",
  Alt: "Alt",
  AltGraph: "AltGr",
  Meta: "⊞",
  CapsLock: "Caps",
  NumLock: "Num",
  ScrollLock: "Scroll",

  // Editing
  Backspace: "⌫",
  Delete: "Del",
  Insert: "Ins",
  Enter: "↵",
  Tab: "↹",
  Escape: "Esc",

  // Navigation
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
  Home: "Home",
  End: "End",
  PageUp: "PgUp",
  PageDown: "PgDn",

  // Space
  Space: "␣",

  // Function
  F1: "F1",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  FN: "Fn",

  // Numpad
  Numpad0: "Num 0",
  Numpad1: "Num 1",
  Numpad2: "Num 2",
  Numpad3: "Num 3",
  Numpad4: "Num 4",
  Numpad5: "Num 5",
  Numpad6: "Num 6",
  Numpad7: "Num 7",
  Numpad8: "Num 8",
  Numpad9: "Num 9",
  NumpadAdd: "+",
  NumpadSubtract: "-",
  NumpadMultiply: "*",
  NumpadDivide: "/",
  NumpadDecimal: ".",
  NumpadEnter: "↵",

  // Media
  AudioVolumeMute: "Mute",
  AudioVolumeDown: "Vol ↓",
  AudioVolumeUp: "Vol ↑",
  MediaTrackNext: "Next",
  MediaTrackPrevious: "Prev",
  MediaStop: "Stop",
  MediaPlayPause: "Play/Pause",

  // Misc
  PrintScreen: "PrtSc",
  Pause: "Pause",
  ContextMenu: "Menu",
  Clear: "Clear",
  Select: "Select",
  Undo: "Undo",
  Redo: "Redo",
  Help: "Help",
};

export const GENERIC_KEY_SYMBOLS: Partial<Record<KeyboardKey, string>> = {
  Shift: "Shift",
  Control: "Ctrl",
  Alt: "Alt",
  Meta: "Meta",
  AltGraph: "AltGraph",
  CapsLock: "Caps Lock",
  NumLock: "Num Lock",
  ScrollLock: "Scroll Lock",

  Backspace: "⌫",
  Delete: "Delete",
  Insert: "Insert",
  Enter: "↵",
  Tab: "⇥",
  Escape: "Esc",

  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
  Home: "Home",
  End: "End",
  PageUp: "Page Up",
  PageDown: "Page Down",

  Space: "␣",

  F1: "F1",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  FN: "Fn",

  Numpad0: "Numpad 0",
  Numpad1: "Numpad 1",
  Numpad2: "Numpad 2",
  Numpad3: "Numpad 3",
  Numpad4: "Numpad 4",
  Numpad5: "Numpad 5",
  Numpad6: "Numpad 6",
  Numpad7: "Numpad 7",
  Numpad8: "Numpad 8",
  Numpad9: "Numpad 9",
  NumpadAdd: "Numpad +",
  NumpadSubtract: "Numpad -",
  NumpadMultiply: "Numpad *",
  NumpadDivide: "Numpad /",
  NumpadDecimal: "Numpad .",
  NumpadEnter: "↵",

  AudioVolumeMute: "Mute",
  AudioVolumeDown: "Vol ↓",
  AudioVolumeUp: "Vol ↑",
  MediaTrackNext: "Next",
  MediaTrackPrevious: "Prev",
  MediaStop: "Stop",
  MediaPlayPause: "Play/Pause",

  PrintScreen: "Print Screen",
  Pause: "Pause",
  ContextMenu: "Menu",
  Clear: "Clear",
  Select: "Select",
  Undo: "Undo",
  Redo: "Redo",
  Help: "Help",
};

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
