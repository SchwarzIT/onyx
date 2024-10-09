import type { DensityProp } from "../../composables/density";
import type { CustomValidityProp } from "../../composables/useCustomValidity";
import type { SkeletonInjected } from "../../composables/useSkeletonState";
import type { AutofocusProp } from "../../types";
import type { FormInjected } from "../OnyxForm/OnyxForm.core";
import type { OnyxFormElementProps } from "../OnyxFormElement/types";
import type { Autocomplete } from "../OnyxInput/types";

export type OnyxStepperProps = DensityProp &
  CustomValidityProp &
  Omit<OnyxFormElementProps, "modelValue" | "errorMessages" | "withCounter" | "maxlength"> &
  AutofocusProp & {
    /**
     * Current value of the input.
     */
    modelValue?: number;
    /**
     * Same as the native `name` attribute of `<input>`.
     * Used to reference the input in JavaScript or in submitted form data.
     */
    name?: string;
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
    step?: number;
    /**
     * Specify how to provide automated assistance in filling out the input.
     * Some autocomplete values might required specific browser permissions to be allowed by the user.
     * Also browsers might require a `name` property.
     *
     * @see [MDN autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
     */
    autocomplete?: Autocomplete;
    /**
     * Whether to disable the input and prevent user interaction.
     */
    disabled?: FormInjected<boolean>;
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
