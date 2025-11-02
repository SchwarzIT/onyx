import type { DensityProp } from "../../composables/density.js";

export const SLIDER_CONTROLS = ["icon", "value", "input"] as const;
export type SliderControl = (typeof SLIDER_CONTROLS)[number];

export type OnyxSliderControlSharedProps = {
  /**
   * The type of control to render.
   *
   * - `value`: Renders a read-only display of the provided slider value.
   * - `icon`: Renders an icon button for increasing or decreasing the slider value.
   * - `input`: Renders an `<OnyxStepper />` component for direct value entry.
   */
  control: SliderControl;
  /**
   * Slider control model value
   */
  modelValue?: number;
  /**
   * The read-only value to display inside the control. In the slider context, this is min and max values.
   */
  value?: number;
  /**
   * The direction the icon button represents.
   *
   * - `decrease`: Decreases the slider value and renders a "minus" icon.
   * - `increase`: Increases the slider value and renders a "plus" icon.
   */
  direction?: "increase" | "decrease";
  /**
   * `shiftStep` of associated slider. Used to determine the amount to increase/decrease the value by when the icon button is clicked.
   */
  shiftStep?: number;
  /**
   * Indicates whether the control is disabled.
   */
  disabled?: boolean;
};

export type OnyxSliderControlValueProps = {
  control: "value";
  value: number;
};

export type OnyxSliderControlIconProps = {
  control: "icon";
  direction: "increase" | "decrease";
  shiftStep: number;
  disabled?: boolean;
};

export type OnyxSliderControlInputProps = {
  control: "input";
  disabled?: boolean;
  modelValue: number;
};

export type OnyxSliderControlProps = OnyxSliderControlSharedProps &
  DensityProp &
  (OnyxSliderControlValueProps | OnyxSliderControlIconProps | OnyxSliderControlInputProps);
