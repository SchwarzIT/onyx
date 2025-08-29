import type { WithLinkProp } from "../components/OnyxRouterLink/types.js";

/**
 * Extracts the link props from the given data and unifies them into an object if its a string link.
 */
export const extractLinkProps = (link: NonNullable<WithLinkProp["link"]>) => {
  if (typeof link === "string") return { href: link };
  return link;
};

/**
 * Checks whether the given link is internal / a relative link of the current application.
 */
export const isInternalLink = (href: string) => {
  // if link can be parsed, it is a full URL with some protocol and domain and no relative link
  // see: https://developer.mozilla.org/en-US/docs/Web/API/URL/canParse_static
  return !URL.canParse(href);
};
