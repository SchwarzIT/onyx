import type { SliderMark, SliderOrientation } from "@sit-onyx/headless";
import type { OnyxFormElementProps } from "../OnyxFormElement/types.js";

export const SLIDER_CONTROLS = ["icon", "value", "input"] as const;
export type OnyxSliderControl = (typeof SLIDER_CONTROLS)[number];
export const SLIDER_TRACK_MODES = ["default", "inverted", false] as const;
export type OnyxSliderTrackMode = (typeof SLIDER_TRACK_MODES)[number];
export const SLIDER_TOOLTIP_DISPLAYS = ["auto", "always", "never"] as const;
export type OnyxSliderTooltipDisplay = (typeof SLIDER_TOOLTIP_DISPLAYS)[number];

export type OnyxSliderProps = Omit<
  OnyxFormElementProps<number[]>,
  | "autocapitalize"
  | "autocomplete"
  | "loading"
  | "minlength"
  | "maxlength"
  | "placeholder"
  | "readonly"
  | "required"
  | "requiredMarker"
  | "withCounter"
> & {
  /**
   * Currently selected value.
   */
  modelValue: number[];
  /**
   * Smallest possible number.
   */
  min?: number;
  /**
   * Highest possible number.
   */
  max?: number;
  /**
   * Step size.
   *
   * @default 1
   */
  step?: number | null;
  /**
   * Specifies the value increment applied when adjusting the slider using Page Up/Page Down or Shift + Arrow keys.
   *
   * @default 10
   */
  shiftStep?: number;
  /**
   * Marks to show for each step.
   *
   * @default false
   */
  marks?: SliderMark[] | boolean;
  /**
   * The track style to use.
   * - `default`: The track fills the area between the minimum value and the active thumb(s).
   * - `inverted`: The track fills the area between the active thumb(s) and the maximum value.
   * - `false`: No track is rendered.
   *
   * @default "default"
   */
  trackMode?: OnyxSliderTrackMode;
  /**
   * Defines if and which control to display in addition to the slider.
   * Can be used to e.g. display inputs or icon buttons that can also be used to change the value.
   */
  control?: OnyxSliderControl;
  /**
   * Orientation of the slider.
   *
   * @default "horizontal"
   */
  orientation?: SliderOrientation;
  /**
   * When to show the tooltip with the current value over the thumb.
   *
   * - `auto`: Show tooltip when the thumb is focused or being dragged.
   * - `always`: Always show the tooltip.
   * - `never`: Never show the tooltip.
   *
   * @default "auto"
   */
  tooltipDisplay?: OnyxSliderTooltipDisplay;
};
