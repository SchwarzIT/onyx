import type { Autocomplete } from "../../composables/useLenientMaxLengthValidation";
import type { Nullable } from "../../types";
import type { SharedFormElementProps } from "../OnyxFormElement/types";

export type OnyxStepperProps = Omit<
  SharedFormElementProps,
  "errorMessages" | "withCounter" | "maxlength"
> & {
  /**
   * The minimum allowed value.
   */
  min?: number;
  /**
   * The maximum allowed value.
   */
  max?: number;
  /**
   * Defines how much the value is adjusted when clicking the +/- button.
   */
  stepSize?: number;
  /**
   * Number of decimal places to show. Can also be negative. Value will be rounded if needed to match the specified precision.
   *
   * @example For `precision=2` with `modelValue=5`, "5.00" will be displayed.
   * @example For `precision=-2` with `modelValue=60`, "100" will be displayed.
   * @example For `precision=0`, only full numbers without decimals will be displayed.
   */
  precision?: number;
  /**
   * Defines step size for valid/allowed values. Will show an error if invalid value is entered.
   * Can be independent of the `stepSize` property.
   *
   * @example For `validStepSize` 0.01, only multiples of 0.01 are valid (useful for currencies)
   * @example For `stepSize=4` `validStepSize=2`, only even numbers are valid and the user can adjust the value by 4 when clicking the +/- button.
   */
  validStepSize?: number;
  /**
   * Specify how to provide automated assistance in filling out the input.
   * Some autocomplete values might required specific browser permissions to be allowed by the user.
   * Also browsers might require a `name` property.
   *
   * @see [MDN autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   */
  autocomplete?: Autocomplete;
  /**
   * If true, the +/- button will be hidden.
   */
  hideButtons?: boolean;
  /**
   * current number input
   */
  modelValue?: Nullable<number>;
};
