/**
 * Returns true if searchString appears as a substring without considering capitalization or diacritics.
 * E.g. `ñ` and `n` are considered to be the same glyph.
 */
export const normalizedIncludes = (
  haystack: string,
  needle: string,
  toLowerCase: boolean = true,
): boolean => {
  let haystackNormalized = removeDiacritics(haystack);
  let needleNormalized = removeDiacritics(needle);

  if (toLowerCase) {
    haystackNormalized = haystackNormalized.toLowerCase();
    needleNormalized = needleNormalized.toLowerCase();
  }

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

/**
 * Gets the initials for the given username by considering the given locale.
 *
 * @returns Initials or undefined if the username contains unsupported characters (e.g. because its a language that does not support initials).
 */
export const getInitials = (username: string, locale: string) => {
  if (UNSUPPORTED_INITIALS_TEXT_REGEX.test(username)) {
    return;
  }

  const wordSegmenter = new Intl.Segmenter(locale, { granularity: "word" });

  const name = username.trim().toUpperCase();
  const wordSegments = Array.from(wordSegmenter.segment(name));
  if (wordSegments.length === 0) return;

  const firstWord = wordSegments[0].segment;
  const lastWord = wordSegments.length === 1 ? undefined : wordSegments.at(-1)?.segment;

  if (!lastWord) {
    return `${getGrapheme(firstWord, locale, 0)}${getGrapheme(firstWord, locale, 1)}`;
  }
  return `${getGrapheme(firstWord, locale, 0)}${getGrapheme(lastWord, locale, 0)}`;
};

/**
 * Gets the character at tht given index using the `Intl.Segmenter` API.
 */
const getGrapheme = (value: string, locale: string, index: number) => {
  const segmenter = new Intl.Segmenter(locale, { granularity: "grapheme" });
  const segments = Array.from(segmenter.segment(value)).map((segment) => segment.segment);
  return segments.at(index) ?? "";
};

/**
 * Regular expression matching languages for which we currently don't support initials.
 * Arabic:   Arabic, Arabic Supplement, Arabic Extended-A.
 * Korean:   Hangul Jamo, Hangul Compatibility Jamo, Hangul Jamo Extended-A, Hangul Syllables, Hangul Jamo Extended-B.
 * Japanese: Hiragana, Katakana.
 * CJK:      CJK Unified Ideographs Extension A, CJK Unified Ideographs, CJK Compatibility Ideographs,
 *             CJK Unified Ideographs Extension B
 *
 * @see https://github.com/microsoft/fluentui/blob/b4a12e8c011441b0d0af21a78091b36074f81ef6/packages/react-components/react-avatar/library/src/utils/getInitials.ts#L34
 */
const UNSUPPORTED_INITIALS_TEXT_REGEX: RegExp =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD869][\uDC00-\uDED6]/;
