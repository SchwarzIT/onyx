import type { DensityProp } from "../../composables/density";

export type OnyxBadgeProps = DensityProp & {
  /**
   * The color of the badge.
   */
  variation?: BadgeVariation;
  /**
   * An icon which will be displayed inside the badge.
   * Note: If the icon property is set, the default slot will not be rendered.
   */
  icon?: string;
};

export const BADGE_VARIATIONS = [
  "primary",
  "secondary",
  "danger",
  "warning",
  "success",
  "info",
] as const;
export type BadgeVariation = (typeof BADGE_VARIATIONS)[number];
