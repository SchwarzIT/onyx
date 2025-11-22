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
 * Normalize raw keyName -> CanonicalKey | raw string
 */
export const toCanonicalKey = (raw: string): CanonicalKey | string => {
  if (!raw) return "unknown";

  if (raw === " ") return "space";

  const trimmed = raw.trim();
  if (!trimmed) return "unknown";

  const lower = trimmed.toLowerCase();
  const fromMap = MAP_SPECIAL_KEY_TO_CANONICAL[lower];

  if (fromMap) return fromMap;

  if (/^F[1-9][0-9]?$/i.test(lower)) {
    return lower.toUpperCase();
  }

  // not a known special key — return as-is (F-keys, letters, numbers, etc.)
  return lower;
};

/**
 * True if value is one of our known canonical special keys
 */
export const isCanonicalSpecialKey = (key: string): key is CanonicalKey =>
  (CANONICAL_KEYS as readonly string[]).includes(key);

/**
 * Normalizes a KeyboardEvent into a value compatible with OnyxShortcut.
 *
 * Goals:
 * - Use `code` for stable identification of digit keys, so shortcuts like Ctrl+Shift+2
 *   are recognized regardless of layout-specific `event.key` (e.g. "@", "²", etc).
 * - Return simple characters (letters, digits, symbols) as-is when reasonable.
 * - Fall back to `toCanonicalKey(key)` for remaining cases.
 *
 * This function does NOT:
 * - Interpret modifier combinations. It means: this function does not decide what shortcut was pressed, only what single key was pressed.
 * - Handle locale-specific layouts beyond basic Digit/Numpad normalization.
 */
export const getCanonicalKeyFromEvent = (event: KeyboardEvent): CanonicalKey | string => {
  const { key, code } = event;

  if (!key) return "unknown";

  if (key === " ") return "space";

  const lowerKey = key.toLowerCase();

  // 1) Direct mapping for known special keys via `key`.
  const mapped = MAP_SPECIAL_KEY_TO_CANONICAL[lowerKey];
  if (mapped) return mapped;

  // 2) Top-row digits (Digit0–Digit9).
  // Use `code` so Ctrl+Shift+2 is still recognized as "2"
  // even if `key` becomes "@", "²", etc.
  if (code.startsWith("Digit") && code.length === 6) {
    const digit = code[5];
    if (!digit) return "unknown";

    if (/[0-9]/.test(digit)) return digit;
  }

  // 3) Numpad digits (optional but useful for consistency).
  if (code.startsWith("Numpad") && code.length === 7) {
    const digit = code[6];
    if (!digit) return "unknown";
    if (/[0-9]/.test(digit)) return digit;
  }

  // 4) Function keys: keep as-is (F1, F2, ...).
  if (/^F[1-9][0-9]?$/i.test(key)) {
    return key.toUpperCase();
  }

  // 5) Single printable characters (letters, digits, symbols).
  // Let them pass through as-is.
  if (key.length === 1) {
    return key;
  }

  // 6) Fallback: use shared normalizer for remaining named keys.
  return toCanonicalKey(key);
};

export type ShortcutToken = CanonicalKey | string;

export type ShortCutAllStep = {
  all: ShortcutToken[];
};

export type ShortCutAnyStep = {
  any: ShortcutToken[];
};

export type ShortcutStep = ShortCutAllStep | ShortCutAnyStep;

export const isAllStep = (step: ShortcutStep): step is ShortCutAllStep => "all" in step;

export const isAnyStep = (step: ShortcutStep): step is ShortCutAnyStep => "any" in step;
