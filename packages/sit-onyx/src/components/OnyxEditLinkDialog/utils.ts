import type { EditLinkValue } from "./types.js";

/**
 * Normalizes a generic link value into a consistent object containing a link and label.
 */
export const parseLinkValue = (value: unknown): EditLinkValue | undefined => {
  if (!value) return;
  if (typeof value === "string") return { href: value };
  if (typeof value !== "object") return;

  const href = "href" in value && typeof value.href === "string" ? value.href : undefined;
  const label = "label" in value && typeof value.label === "string" ? value.label : undefined;
  if (!href) return;
  return { href, label };
};
