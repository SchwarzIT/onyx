export const normalizedIncludes = (haystack: string, needle: string): boolean => {
  const haystackNormalized = removeDiacritics(haystack.toLowerCase());
  const needleNormalized = removeDiacritics(needle.toLowerCase());

  return haystackNormalized.includes(needleNormalized);
};

const removeDiacritics = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
