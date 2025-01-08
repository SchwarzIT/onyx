/**
 * Returns true if searchString appears as a substring without considering capitalization or diacritics.
 * E.g. `ñ` and `n` are considered to be the same glyph.
 */
export const normalizedIncludes = (haystack: string, needle: string): boolean => {
  const haystackNormalized = removeDiacritics(haystack.toLowerCase());
  const needleNormalized = removeDiacritics(needle.toLowerCase());

  return haystackNormalized.includes(needleNormalized);
};

const removeDiacritics = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/**
 * Normalizes the given text (e.g. from a headline) to a URL-safe string that can be used as URL hash.
 *
 * @example "Hello World" => "hello-world", e.g. used as "https://example.com/my-page#hello-world"
 */
export const normalizeUrlHash = (text: string) => {
  return text.trim().toLowerCase().replace(/\W/gi, "-");
};
