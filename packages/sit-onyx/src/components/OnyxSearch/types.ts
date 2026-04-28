import type { OnyxInputProps } from "../OnyxInput/types.js";

export type OnyxSearchProps = Pick<
  OnyxInputProps,
  | "message"
  | "maxlength"
  | "error"
  | "readonly"
  | "disabled"
  | "density"
  | "id"
  | "name"
  | "skeleton"
  | "modelValue"
  | "autofocus"
  | "loading"
> & {
  /**
   * The label displayed on the Search
   */
  label: string;

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
  /** Determines whether the filter should be displayed.
   * 'undefined': filter button is hidden
   */
  showFilter?: boolean;

  /** Determines whether the personal filters should be displayed.
   * 'undefined': filter button is hidden
   */
  showPersonalFilter?: boolean;

  /** Indicates whether keyboard shortcuts should be enabled for quick access. */
  withShortcut?: boolean;
};

export const SEARCH_COLORS = ["blank", "tinted"] as const;
export type SearchColor = (typeof SEARCH_COLORS)[number];

export const SEARCH_CORNER_RADII = ["soft", "strong"] as const;
export type SearchCornerRadius = (typeof SEARCH_CORNER_RADII)[number];
