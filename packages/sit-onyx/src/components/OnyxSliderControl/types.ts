import type { DensityProp } from "../../composables/density.js";

export const SLIDER_CONTROLS = ["icon", "value", "input"] as const;
export type SliderControl = (typeof SLIDER_CONTROLS)[number];

export type OnyxSliderControlValueProps = {
  control: "value";
  // the never types are needed to prevent a console warning about missing required props (although they are not required for this specific union type)
  step?: never;
  min?: never;
  max?: never;
};

export type OnyxSliderControlIconProps = {
  control: "icon";
  direction: SliderControlDirection;
  /**
   * Step size to change value when clicking the icon button.
   */
  step: number;
  min?: never;
  max?: never;
};

export type OnyxSliderControlInputProps = {
  control: "input";
  direction?: SliderControlDirection;
  /**
   * Step size to use for the stepper.
   */
  step: number;
  min: number;
  max: number;
};

export type SliderControlDirection = "increase" | "decrease";

export type OnyxSliderControlProps = DensityProp &
  (OnyxSliderControlValueProps | OnyxSliderControlIconProps | OnyxSliderControlInputProps) & {
    /**
     * Current control value.
     */
    modelValue: number;
    /**
     * Whether the control is disabled.
     */
    disabled?: boolean;
  };
