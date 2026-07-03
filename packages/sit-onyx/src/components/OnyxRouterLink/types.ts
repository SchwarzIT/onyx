import type { OnyxExternalLinkIconProps } from "../OnyxExternalLinkIcon/types.js";

export type OnyxRouterLinkProps = SharedLinkProps;

export type SharedLinkProps = {
  /**
   * The URL/link to point to.
   * Will use the router for internal links if provided, see [our documentation](https://onyx.schwarz/development/router.html) for further details.
   */
  href: string;
  /**
   * Where to display the linked URL (same tab, new tab etc.).
   * For `_blank`, the `rel="noreferrer"` will be set automatically.
   * If set to "auto", external links will be opened with "_blank" and internal ones with "_self".
   */
  target?: LinkTarget | "auto";
};

export const LINK_TARGETS = [
  /**
   * Opens in the current browsing context. (Default)
   */
  "_self",
  /**
   * Usually opens in a new tab, but users can configure browsers to open a new window instead.
   */
  "_blank",
  /**
   * Opens in the parent browsing context of the current one. If no parent, behaves as `_self`.
   */
  "_parent",
  /**
   * Opens in the topmost browsing context. To be specific, this means the "highest" context that's an ancestor of the current one. If no ancestors, behaves as `_self`.
   */
  "_top",
] as const;

export type LinkTarget = (typeof LINK_TARGETS)[number];

export type WithLinkProp<TExternalLink extends boolean = false> = {
  /**
   * If set, the component will be rendered as link.
   */
  link?:
    | string
    | (TExternalLink extends true ? SharedLinkProps & OnyxExternalLinkIconProps : SharedLinkProps);
};
