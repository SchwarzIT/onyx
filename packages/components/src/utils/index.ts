/**
 * Checks whether the given link is external (starts with http:// or https://).
 */
export const isExternalLink = (href: string): href is `http${"s" | ""}://${string}` => {
  return /^http(s?):\/\//.test(href);
};
