export type OnyxLinkProps = {
  /**
   * URL that the link points to.
   */
  href: string;
  /**
   * Where to display the linked URL (same tab, new tab etc.).
   * For `_blank`, the `rel="noopener noreferrer"` will be set automatically.
   */
  target?: LinkTarget;
  /**
   * Whether to hide the external link icon if `href` points to an external website.
   * For internal/relative links or protocols like mailto:, tel: etc. it will be hidden automatically.
   */
  hideExternalLink?: boolean;
};

export const LINK_TARGETS = ["_self", "_blank", "_parent", "_top"] as const;
export type LinkTarget = (typeof LINK_TARGETS)[number];
