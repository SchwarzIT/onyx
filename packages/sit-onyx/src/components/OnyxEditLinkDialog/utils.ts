import { LINK_TARGETS, type LinkTarget } from "../OnyxRouterLink/types.js";
import type { EditLinkValue } from "./types.js";

/**
 * Normalizes a generic link value into a consistent object containing a link and label.
 */
export const parseLinkValue = (value: unknown): EditLinkValue | undefined => {
  if (!value) return;
  if (typeof value === "string") return { href: value };
  if (typeof value !== "object") return;

  const href = "href" in value && typeof value.href === "string" ? value.href : undefined;
  if (!href) return;

  const result: EditLinkValue = { href };
  if ("label" in value && typeof value.label === "string") {
    result.label = value.label;
  }
  if (
    "target" in value &&
    typeof value.target === "string" &&
    LINK_TARGETS.includes(value.target as LinkTarget)
  ) {
    result.target = value.target as EditLinkValue["target"];
  }

  if ("withExternalIcon" in value) {
    const iconValue = value.withExternalIcon;
    if (typeof iconValue === "boolean" || iconValue === "auto") {
      result.withExternalIcon = iconValue;
    }
  }

  return result;
};
