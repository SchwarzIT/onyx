import type { OnyxColor } from "@/index";

export type OnyxIconProps = {
  /**
   * SVG source of the icon. **Important**: Only provide trustworthy content, the SVG content will
   * not be sanitized.
   */
  icon: string;
  /**
   * Icon size in px. Will be translated to the according rem value.
   * @default 24
   */
  size?: IconSize;
  /** Icon color. */
  color?: OnyxColor | "currentColor";
};

export const ICON_SIZES = ["12", "16", "24", "32", "48", "64", "96"] as const;
export type IconSize = (typeof ICON_SIZES)[number];
