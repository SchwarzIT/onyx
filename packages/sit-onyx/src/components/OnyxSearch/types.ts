import type { OnyxInputProps } from "../OnyxInput/types.js";

export type OnyxSearchProps = Pick<
  OnyxInputProps,
  | "disabled"
  | "density"
  | "id"
  | "label"
  | "name"
  | "skeleton"
  | "modelValue"
  | "autofocus"
  | "loading"
> & {
  /**
   * The component is available in two color modes: blank and tinted.
   * Use the color that is opposite to the tinted or blank color of the underlying canvas.
   *
   * @default "blank"
   */
  color?: SearchColor;
  /**
   * Set the size of the corner radii.
   *
   * @default "blank"
   */
  cornerRadius?: SearchCornerRadius;
};

export const SEARCH_COLORS = ["blank", "tinted"] as const;
export type SearchColor = (typeof SEARCH_COLORS)[number];

export const SEARCH_CORNER_RADII = ["soft", "strong"] as const;
export type SearchCornerRadius = (typeof SEARCH_CORNER_RADII)[number];
