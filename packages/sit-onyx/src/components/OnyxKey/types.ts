import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { OperatingSystem } from "../../types/index.js";
import type { CanonicalKey } from "../../utils/shortcut.js";

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
   *
   * @default "auto"
   */
  variant?: OperatingSystem | "auto";
  /**
   * Key press state (for visual effect)
   *
   * @default false
   */
  pressed?: boolean;
  /**
   * Text for screen reader (if not specified, will be generated automatically)
   */
  label?: string;
  /**
   * Whether to show a skeleton key.
   */
  skeleton?: SkeletonInjected;
};
