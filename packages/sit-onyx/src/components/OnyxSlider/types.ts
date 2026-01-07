import type { SharedFormElementProps } from "../OnyxFormElement/types.js";
import type { SliderControl } from "../OnyxSliderControl/types.js";

export type SliderMark = {
  value: number;
  label?: string;
};

export const SLIDER_MODES = ["single", "range"] as const;
export type SliderMode = (typeof SLIDER_MODES)[number];

export type SliderValue<TSliderMode extends SliderMode> = TSliderMode extends "single"
  ? number
  : [number, number];

export type OnyxSliderProps<TSliderMode extends SliderMode> = Omit<
  SharedFormElementProps,
  "placeholder" | "required" | "requiredMarker" | "readonly" | "loading"
> & {
  /**
   * Defines the mode of the slider (single or range).
   */
  mode?: TSliderMode;
  /**
   * Current value(s) of the slider, depending on the `mode`.
   * For a single mode, pass a single number. For range model pass an array with two numbers.
   *
   * Recommended defaults (if your project has no specific initial value):
   * - `single` mode: middle of the range → `(min + max) / 2`.
   * - `range` mode: full range → `[min, max]`.
   */
  modelValue: SliderValue<TSliderMode>;
  /**
   * Smallest possible number.
   */
  min?: number;
  /**
   * Highest possible number.
   */
  max?: number;
  /**
   * Step size to increase/decrease the slider value when moving the thumb(s).
   */
  step?: number;
  /**
   * Step size to increase/decrease the slider value when changing the value via keyboard while pressing the "Shift" key.
   *
   * @default 10% of the total range (max - min)
   */
  shiftStep?: number;
  /**
   * Whether to show marks inside the slider rail.
   * - `true`: will generate marks automatically based on `step` prop
   * - array of numbers or `SliderMark` objects: will shown at the specified values with optional labels
   */
  marks?: SliderMark[] | number[] | boolean;
  /**
   * Optional value controls to display in addition to the slider.
   *
   * - `value`: shows min and max value labels (non-interactive)
   * - `icon`: shows icon buttons to increment/decrement the value. Works only in `single` mode
   * - `input`: shows stepper(s) to input the value directly
   */
  control?: SliderControl;
  /**
   * Options to customize the tooltip behavior.
   */
  tooltip?: SliderTooltipOptions;
};

export type SliderTooltipOptions = {
  /**
   * Whether to hide the tooltip.
   */
  hidden?: boolean;
  /**
   * Optional formatter to customize the displayed tooltip value.
   *
   * @param value Thumb value.
   * @param index Thumb index, will always be 0 for single sliders but can be 0 or 1 for range sliders.
   */
  formatter?: (value: number, index: number) => string;
};
