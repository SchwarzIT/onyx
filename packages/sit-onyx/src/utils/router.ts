import type { WithLinkProp } from "../components/OnyxRouterLink/types";

/**
 * Extracts the link props from the given data and unifies them into an object if its a string link.
 */
export const extractLinkProps = (link: NonNullable<WithLinkProp["link"]>) => {
  if (typeof link === "string") return { href: link };
  return link;
};
