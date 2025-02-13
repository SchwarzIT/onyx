/**
 * Checks whether the given link is internal / a relative link of the current application.
 */
export const isInternalLink = (href: string) => {
  return href.startsWith("/") || href.startsWith("#");
};
