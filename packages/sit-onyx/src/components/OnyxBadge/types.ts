import type { DensityProp } from "../../composables/density";

export type OnyxBadgeProps = DensityProp & {
  /**
   * The color of the badge.
   */
  variation?: BadgeVariation;
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
