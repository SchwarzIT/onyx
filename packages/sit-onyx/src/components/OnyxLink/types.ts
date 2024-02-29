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
   * Whether to show the external link icon.
   * If set to `auto`, it will be shown when the `href` leads to another website
   * and will be hidden otherwise.
   */
  withExternalIcon?: boolean | "auto";
};

export const LINK_TARGETS = ["_self", "_blank", "_parent", "_top"] as const;
export type LinkTarget = (typeof LINK_TARGETS)[number];
