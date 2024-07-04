import type { OnyxExternalLinkIcon } from "../OnyxExternalLinkIcon/types";

export type OnyxLinkProps = OnyxExternalLinkIcon & {
  /**
   * Where to display the linked URL (same tab, new tab etc.).
   * For `_blank`, the `rel="noreferrer"` will be set automatically.
   */
  target?: LinkTarget;
};

export const LINK_TARGETS = ["_self", "_blank", "_parent", "_top"] as const;
export type LinkTarget = (typeof LINK_TARGETS)[number];
