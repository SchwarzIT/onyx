import type { OnyxColor } from "@/index";

export type OnyxIconProps = {
  /**
   * SVG source of the icon. **Important**: Only provide trustworthy content, the SVG content will
   * not be sanitized.
   */
  icon: string;
  /**
   * Icon size. Pixel values will be translated to the according rem value.
   * Note to swap out `.` with `-`, e.g. for `1.5rem` use `1-5rem`.
   * @default 24px
   */
  size?: IconSize;
  /** Icon color. */
  color?: OnyxColor | "currentColor";
};

export const ICON_SIZES = ["12px", "16px", "24px", "32px", "48px", "64px", "96px"] as const;
export type IconSize = (typeof ICON_SIZES)[number];
