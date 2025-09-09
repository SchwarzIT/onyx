/**
 * Escapes the given key for save usage in CSS (e.g. as part of a CSS variable name or selector).
 * Will use the native "CSS.escape()" if available in the browser, otherwise a fallback will be used.
 */
export const escapeCSS = (key: PropertyKey) => {
  // to prevent server side hydration errors, we are using the description for symbols so the name does not contain "(" or ")"
  // which would be escaped differently on server side (where window.CSS) is not available than on client side
  const name = typeof key === "symbol" && key.description ? key.description : String(key);
  // if (window && "CSS" in window && window.CSS) return CSS.escape(name);
  return name.replace(/\W/g, "-");
};
