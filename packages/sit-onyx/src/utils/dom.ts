import type { OperatingSystem } from "../types/index.js";

/**
 * Escapes the given key for save usage in CSS (e.g. as part of a CSS variable name or selector).
 * Will use the native "CSS.escape()" if available in the browser, otherwise a fallback will be used.
 */
export const escapeCSS = (key: PropertyKey) => {
  // to prevent server side hydration errors, we are using the description for symbols so the name does not contain "(" or ")"
  // which would be escaped differently on server side (where window.CSS) is not available than on client side
  const name = typeof key === "symbol" && key.description ? key.description : String(key);
  if (globalThis.window && window.CSS) return CSS.escape(name);
  return name.replace(/\W/g, "-");
};

/**
 * Detects operating system based on the user agent string.
 * Returns `macOS`, `windows`, or `generic` if the OS cannot be determined.
 */
export const detectOperatingSystem = (): OperatingSystem => {
  if (!globalThis.window || !globalThis.navigator) {
    return "generic";
  }

  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("windows")) {
    return "windows";
  }
  if (userAgent.includes("macintosh") || userAgent.includes("mac os x")) {
    return "macOS";
  }
  return "generic";
};
