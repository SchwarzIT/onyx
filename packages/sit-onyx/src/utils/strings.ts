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
 * Creates a URL-safe hash that can be used with the `OnyxHeadline` component if the headline text/content is
 * dynamic, e.g. when used inside a v-for.
 *
 * @example "Hello World" => "hello-world"
 */
export const createHeadlineHash = (text: string) => {
  return text.trim().toLowerCase().replace(/\W/gi, "-");
};
