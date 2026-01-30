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
 * Checks whether the given element is a typeable element (e.g. input, textarea, or contenteditable).
 */
export const isTypeableElement = (element: Element | null): boolean => {
  if (!(element instanceof HTMLElement)) return false;

  if (element.isContentEditable) return true;

  const tag = element.tagName.toLowerCase();

  if (tag === "textarea") return true;

  if (tag === "input" && "type" in element) {
    const type = element.type;
    return !["checkbox", "radio", "button", "submit", "range", "file"].includes(String(type));
  }

  return false;
};
