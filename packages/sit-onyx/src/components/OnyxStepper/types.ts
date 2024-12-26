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
     * Number of decimal places to show. Can also be negative. Value will be rounded if needed
     * to match the specified precision.
     *
     * @example For `precision=2` with `modelValue=5`, "5.00" will be displayed.
     * @example For `precision=-1` with `modelValue=60`, "100" will be displayed.
     * @default undefined
     */
    precision?: number;

    /**
     * Defines how much the value is adjusted when clicking the +/- button.
     *
     * @default 1
     */
    stepSize?: number;
    /**
     * Defines step size f0r valid/allowed values. Can be independent of the `stepSize` property.
     * Uses the `min` property as base so if defining min=3 with validStepSize=2, only odd numbers will
     *
     * @example For `validStepSize` 0.01, only multiples of 0.01 are valid (useful for currencies)
     * @example For `stepSize=4` `validStepSize=2`, only even numbers are valid and the user can adjust the value by 4 when clicking the +/- button.
     * @example For `min=3` and `validStepSize=2`, only odd numbers will be valid
     * @default undefined
     */
    validStepSize?: number;

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
