import type { OnyxColor } from "../../types/colors";

export type OnyxTagProps = {
  /**
   * The text content of the tag.
   */
  label: string;
  /**
   * The color of the tag.
   */
  color?: Extract<OnyxColor, "primary" | "secondary" | "danger" | "warning" | "success" | "info">;
  /**
   * An icon which will be displayed on the left side of the label.
   */
  icon?: string;
  /**
   * The density of the tag.
   */
  density?: Density;
};

export const DENSITIES = ["default", "compact", "cozy"] as const;
export type Density = (typeof DENSITIES)[number];
