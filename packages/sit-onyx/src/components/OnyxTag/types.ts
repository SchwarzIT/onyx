import type { OnyxColor } from "@/types";

export type OnyxTagProps = {
  /**
   * The text content of the tag.
   */
  label: string;
  /**
   * The color of the tag.
   */
  color?: OnyxColor;
  /**
   * An icon which will be displayed on the left side of the label.
   */
  icon?: string;
  /**
   * The density of the tag.
   */
  // dense?: boolean;
};

export const TAG_VARIATIONS = [
  "primary",
  "secondary",
  "danger",
  "warning",
  "success",
  "info",
] as const;
export type TagVariation = (typeof TAG_VARIATIONS)[number];
