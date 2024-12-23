import type { DensityProp } from "../../composables/density";
import type { CustomValidityProp } from "../../composables/useCustomValidity";
import type { SkeletonInjected } from "../../composables/useSkeletonState";
import type { AutofocusProp } from "../../types";
import type { FormInjectedProps } from "../OnyxForm/OnyxForm.core";
import type { SharedFormElementProps } from "../OnyxFormElement/types";
import type { Autocomplete } from "../OnyxInput/types";

export type OnyxStepperProps = FormInjectedProps &
  DensityProp &
  CustomValidityProp &
  Omit<SharedFormElementProps, "modelValue" | "errorMessages" | "withCounter" | "maxlength"> &
  AutofocusProp & {
    /**
     * Placeholder to show when the value is empty.
     */
    placeholder?: string;
    /**
     * The minimum allowed value.
     */
    min?: number;
    /**
     * The maximum allowed value.
     */
    max?: number;
    /**
     * Incremental step.
     */
    /**
     * Incremental step.
     * @deprecated
     */
    step?: number; // step-mismatch + step-increment

    /**
     * The smallest allowed value and rounded precision
     */
    precision?: number; // step-mismatch => uses :step="props.precision" for the validation
    /**
     * The increment number
     * @default precision is the default stepSize
     */
    stepSize?: number; //  step-increment => number which is used for increment/decrement

    /**
     * Ensure no wrong number can be inputed
     */
    stripStep?: boolean;

    /**
     * Specify how to provide automated assistance in filling out the input.
     * Some autocomplete values might required specific browser permissions to be allowed by the user.
     * Also browsers might require a `name` property.
     *
     * @see [MDN autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
     */
    autocomplete?: Autocomplete;
    /**
     * Whether the input should be readonly.
     */
    readonly?: boolean;
    /**
     * Whether the input is loading. User interaction will be disabled.
     */
    loading?: boolean;
    /**
     * Whether to show a skeleton input.
     */
    skeleton?: SkeletonInjected;
  };
