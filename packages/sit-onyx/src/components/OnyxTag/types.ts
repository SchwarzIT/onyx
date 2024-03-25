// import type { OnyxColor } from "@/types/colors";

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

/// TODO: need to fix it
export const ONYX_COLORS = [
  "primary",
  "secondary",
  "danger",
  "warning",
  "success",
  "info",
] as const;
export type OnyxColor = (typeof ONYX_COLORS)[number];
