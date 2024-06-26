import type { OnyxColor } from "../../types/colors";

export type OnyxIconProps = IconSizeProp & {
  /**
   * SVG source of the icon. **Important**: Only provide trustworthy content, the SVG content will
   * not be sanitized.
   */
  icon: string;
  /**
   * Icon color.
   */
  color?: OnyxColor | "currentColor";
};

export const ICON_SIZES = ["12px", "16px", "24px", "32px", "48px", "64px", "96px"] as const;
export type IconSize = (typeof ICON_SIZES)[number];

export type IconSizeProp<T extends IconSize = IconSize> = {
  /**
   * Size. Pixel values will be translated to the according `rem` value by the base of `16px`=`1rem`.
   *
   * @default 24px
   */
  size?: T;
};
