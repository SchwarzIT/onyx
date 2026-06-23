export type LinkValue = {
  link: string;
  label?: string;
};

/**
 * Normalizes a generic link value into a consistent object containing a link and label.
 */
export const parseLinkValue = (value: unknown): LinkValue | undefined => {
  if (!value) return;
  if (typeof value === "string") return { link: value };
  if (typeof value !== "object") return;

  const link = "link" in value && typeof value.link === "string" ? value.link : undefined;
  const label = "label" in value && typeof value.label === "string" ? value.label : undefined;
  if (!link) return;
  return { link, label };
};
