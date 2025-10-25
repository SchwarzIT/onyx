import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { Orientation } from "../../types/index.js";
import type { OnyxFormElementProps } from "../OnyxFormElement/types.js";

export const SLIDER_CONTROLS = ["icon", "value", "input"] as const;
export type SliderControl = (typeof SLIDER_CONTROLS)[number];

export type SliderMark =
  | {
      value: number;
      label?: string;
    }
  | number;
export const SLIDER_MODES = ["single", "range"] as const;
export type SliderMode = (typeof SLIDER_MODES)[number];

export type SliderValue<TSliderMode extends SliderMode = "single"> = TSliderMode extends "single"
  ? number
  : [number, number];

export type OnyxSliderProps<TSliderMode extends SliderMode = "single"> = Omit<
  OnyxFormElementProps<SliderValue<TSliderMode>>,
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
  | "modelValue"
> & {
  /**
   * Defines the mode of the slider.
   *
   * - `single`: A single-thumb slider for selecting one value.
   * - `range`: A range slider with two thumbs for selecting a value range.
   *
   * @default "single"
   */
  mode?: TSliderMode;
  /**
   * Current value(s) of the slider.
   *
   * - `single` mode: provide a single value, e.g. `42`.
   * - `range` mode: provide two values, e.g. `[20, 80]`.
   *
   * Constraints:
   * - Each value must be within `[min, max]`.
   * - Values should align to `step` (when `discrete` is true they will snap).
   * - For `range` mode, values should be in ascending order.
   *
   * Recommended defaults (if your product has no specific initial value):
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
   * Step size.
   *
   * @default 1
   */
  step?: number;
  /**
   * Step size when holding shift key or using Page Up/Page Down keys.
   *
   * Defaults to 10% of the total range (max - min) multiplied by the step size.
   * This provides intuitive behavior that automatically scales with different slider ranges.
   */
  shiftStep?: number;
  /**
   * Marks to show for each step.
   * - If set to `true`, marks will be generated automatically based on `step` prop.
   * - If an array of `SliderMark` is provided, marks will be shown at the specified values with optional labels.
   * - If set to `false`, no marks will be displayed.
   *
   * @default false
   */
  marks?: SliderMark[] | boolean;
  /**
   * Defines if and which control to display in addition to the slider.
   * Can be used to e.g. display inputs or icon buttons that can also be used to change the value.
   *
   * - `value`: shows min and max value labels.
   * - `icon`: shows icon buttons to increment/decrement the value. The buttons increment/decrement by the shiftStep value. Available only for `single` mode.
   */
  control?: SliderControl;
  /**
   * Orientation of the slider.
   *
   * @default "horizontal"
   */
  orientation?: Orientation;
  /**
   * When to show the tooltip with the current value over the thumb.
   *
   * @default undefined
   */
  disableTooltip?: boolean;
  /**
   * Whether to show a skeleton slider.
   */
  skeleton?: SkeletonInjected;
  /**
   * Whether to render the slider in discrete mode.
   * In discrete mode, the slider will snap to the nearest step/mark.
   *
   * @default false
   */
  discrete?: boolean;
};
