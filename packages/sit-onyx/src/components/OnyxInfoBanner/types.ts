import type { OnyxColor } from "../../types";

export interface OnyxInfoBannerProps {
  /**
   * Color of the banner
   */
  color?: Extract<OnyxColor, "neutral" | "danger" | "warning" | "success">;
  /**
   * Text of the banner
   */
  description: string;
  /**
   * Variation of the banner
   */
  type?: "cozy" | "compact";
  /**
   * Headline
   */
  title?: string;
  /**
   * Icon to display
   */
  icon?: string | false;
  /**
   * Use this property to make the banner closable
   */
  closable?: boolean;
  /**
   * Use it to show the action button
   */
  hasAction?: boolean;
  /**
   * Text of the action button
   */
  buttonText?: string;
}
