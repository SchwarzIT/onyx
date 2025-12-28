import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { OperatingSystem } from "../../types/index.js";

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
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
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

export type OnyxKeyProps = {
  /**
   * The keyboard key.
   */
  keyName: KeyboardKey;
  /**
   * Key display option depending on Operating System. "auto" detects the OS automatically.
   *
   * @default "auto"
   */
  variant?: OperatingSystem | "auto";
  /**
   * Key highlight state (for visual effect)
   *
   * @default false
   */
  highlighted?: boolean;
  /**
   * Whether to show a skeleton key.
   */
  skeleton?: SkeletonInjected;
  /**
   * Whether to highlight the key when it is pressed.
   */
  highlightWhenPressed?: boolean;
};
