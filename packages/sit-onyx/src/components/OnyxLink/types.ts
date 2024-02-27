import type { TextSize } from "../../types/fonts";

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
   * Text size.
   */
  size?: TextSize;
  /**
   * If `true`, the monospace font family will be used instead of the default one.
   */
  monospace?: boolean;
};

export const LINK_TARGETS = ["_self", "_blank", "_parent", "_top"] as const;
export type LinkTarget = (typeof LINK_TARGETS)[number];
