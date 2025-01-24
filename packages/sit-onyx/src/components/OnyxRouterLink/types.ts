export type OnyxRouterLinkProps = SharedLinkProps;

export type SharedLinkProps = {
  /**
   * The URL/link to point to.
   */
  href: string;
  /**
   * Where to display the linked URL (same tab, new tab etc.).
   * For `_blank`, the `rel="noreferrer"` will be set automatically.
   */
  target?: LinkTarget;
};

export const LINK_TARGETS = ["_self", "_blank", "_parent", "_top"] as const;
export type LinkTarget = (typeof LINK_TARGETS)[number];
