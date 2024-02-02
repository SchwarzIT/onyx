import type { OnyxColor } from "@/index";

export type OnyxIconProps = {
  /**
   * SVG source of the icon. **Important**: Only provide trustworthy content, the SVG content will
   * not be sanitized.
   */
  icon: string;
  /** Icon size. */
  size?: IconSize;
  /** Icon color. */
  color?: OnyxColor | "currentColor";
};

export const ICON_SIZES = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;
export type IconSize = (typeof ICON_SIZES)[number];
