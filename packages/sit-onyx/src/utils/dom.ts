/**
 * Escapes the given string for save usage in CSS (e.g. as selector).
 * Will use the native "CSS.escape()" if available in the browser, otherwise a fallback will be used.
 */
export const escapeCSS = (name: string) => {
  if ("CSS" in window && window.CSS) return CSS.escape(name);
  return name.replace(/\W/g, "-");
};
