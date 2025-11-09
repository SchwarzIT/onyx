import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { OperatingSystem } from "../../types/index.js";

/**
 * Canonical names of special keys.
 * All custom string values (letters, numbers, F-keys)
 * remain as they are and are not required to be included in this list.
 */
export const CANONICAL_KEYS = [
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
] as const;

export type CanonicalKey = (typeof CANONICAL_KEYS)[number];

/**
 * Normalization of special keys from "raw" names to CanonicalKey.
 */
export const MAP_SPECIAL_KEY_TO_CANONICAL: Record<string, CanonicalKey> = {
  // Shift
  shift: "shift",

  // meta / windows / command
  cmd: "meta",
  command: "meta",
  win: "meta",
  windows: "meta",
  meta: "meta",

  // control
  control: "control",
  ctl: "control",
  ctrl: "control",

  // alt / option
  alt: "alt",
  option: "option",

  // enter / return
  return: "enter",
  enter: "enter",

  // backspace
  bksp: "backspace",
  back: "backspace",
  backspace: "backspace",

  // caps lock
  caps: "caps-lock",
  "caps-lock": "caps-lock",

  // escape
  esc: "esc",
  escape: "esc",

  // tab
  tab: "tab",
  tabulator: "tab",

  // space
  space: "space",

  // delete (forward delete)
  del: "delete",
  delete: "delete",

  // navigation
  home: "home",
  end: "end",
  pageup: "page-up",
  pagedown: "page-down",
  "page-up": "page-up",
  "page-down": "page-down",

  up: "up",
  down: "down",
  left: "left",
  right: "right",
  arrowup: "up",
  arrowdown: "down",
  arrowleft: "left",
  arrowright: "right",

  "↑": "up",
  "↓": "down",
  "←": "left",
  "→": "right",

  // fn
  fn: "fn",

  unknown: "unknown",
};

/**
 * Screen reader labels
 */
export const MAP_CANONICAL_TO_SCREEN_READER_LABEL_BY_OS: Record<
  OperatingSystem,
  Partial<Record<CanonicalKey, string>>
> = {
  macOS: {
    meta: "Command",
    control: "Control",
    alt: "Option",
    option: "Option",
    shift: "Shift",
    enter: "Enter",
    tab: "Tab",
    backspace: "Backspace",
    "caps-lock": "Caps Lock",
    esc: "Escape",
    space: "Space",
    up: "Up Arrow",
    down: "Down Arrow",
    left: "Left Arrow",
    right: "Right Arrow",
    delete: "Delete",
    home: "Home",
    end: "End",
    "page-up": "Page Up",
    "page-down": "Page Down",
    fn: "Function",
  },
  windows: {
    meta: "Windows",
    control: "Control",
    alt: "Alt",
    option: "Alt",
    shift: "Shift",
    enter: "Enter",
    tab: "Tab",
    backspace: "Backspace",
    "caps-lock": "Caps Lock",
    esc: "Escape",
    space: "Space",
    up: "Up Arrow",
    down: "Down Arrow",
    left: "Left Arrow",
    right: "Right Arrow",
    delete: "Delete",
    home: "Home",
    end: "End",
    "page-up": "Page Up",
    "page-down": "Page Down",
    fn: "Function",
  },
  generic: {
    meta: "Meta",
    control: "Control",
    alt: "Alt",
    option: "Option",
    shift: "Shift",
    enter: "Enter",
    tab: "Tab",
    backspace: "Backspace",
    "caps-lock": "Caps Lock",
    esc: "Escape",
    space: "Space",
    up: "Up Arrow",
    down: "Down Arrow",
    left: "Left Arrow",
    right: "Right Arrow",
    delete: "Delete",
    home: "Home",
    end: "End",
    "page-up": "Page Up",
    "page-down": "Page Down",
    fn: "Function",
  },
};

/**
 * Uses Unicode characters from tables.
 *
 * https://acrobatfaq.com/atbref10/index/Keyboard_Shortcuts/Unicode_Codes_for_Keyboard_symbols.html
 */
export const MAP_CANONICAL_TO_DISPLAY_LABEL_BY_OS: Record<
  OperatingSystem,
  Partial<Record<CanonicalKey, string>>
> = {
  macOS: {
    meta: "⌘", // U+2318
    control: "⌃", // U+2303
    alt: "⌥", // U+2325
    option: "⌥",
    shift: "⇧", // U+21E7
    enter: "↩︎", // Return / Enter
    tab: "⇥", // U+21E5
    backspace: "⌫", // U+232B
    "caps-lock": "⇪", // U+21EA
    esc: "⎋", // U+238B
    space: "␣", // U+2423 (visually space)
    up: "↑",
    down: "↓",
    left: "←",
    right: "→",
    "page-up": "⇞", // U+21DE
    "page-down": "⇟", // U+21DF
    home: "⇱", // U+21F1
    end: "⇲", // U+21F2
    delete: "⌦", // U+2326 (Forward Delete)
    fn: "fn",
  },
  windows: {
    meta: "⊞", // Windows key (common symbol)
    control: "Ctrl",
    alt: "Alt",
    option: "Alt",
    shift: "Shift",
    enter: "Enter",
    tab: "Tab",
    backspace: "Backspace",
    "caps-lock": "Caps",
    esc: "Esc",
    space: "Space",
    up: "↑",
    down: "↓",
    left: "←",
    right: "→",
    "page-up": "PgUp",
    "page-down": "PgDn",
    home: "Home",
    end: "End",
    delete: "Del",
    fn: "Fn",
  },
  generic: {
    meta: "Meta",
    control: "Ctrl",
    alt: "Alt",
    option: "Alt",
    shift: "Shift",
    enter: "Enter",
    tab: "Tab",
    backspace: "Backspace",
    "caps-lock": "Caps Lock",
    esc: "Esc",
    space: "Space",
    up: "↑",
    down: "↓",
    left: "←",
    right: "→",
    "page-up": "PgUp",
    "page-down": "PgDn",
    home: "Home",
    end: "End",
    delete: "Del",
    fn: "Fn",
  },
};

export type OnyxKeyProps<TKeyName extends string = CanonicalKey> = {
  /**
   * The key name (can be canonical or any custom string).
   */
  keyName: TKeyName;
  /**
   * Key display option depending on Operating System. "auto" detects the OS automatically.
   */
  variant?: OperatingSystem | "auto";
  /**
   * Key press state (for visual effect)
   */
  pressed?: boolean;
  /**
   * Text for screen reader (if not specified, will be generated automatically)
   */
  label?: string;
  /**
   * Whether to show a skeleton button.
   */
  skeleton?: SkeletonInjected;
};
