import type { DensityProp } from "../../composables/density";
import type { RequiredMarkerProp } from "../../composables/required";
import type { CustomValidityProp } from "../../composables/useCustomValidity";
import type { OnyxInputProps } from "../OnyxInput/types";

export type OnyxTextareaProps = DensityProp &
  RequiredMarkerProp &
  CustomValidityProp &
  Pick<
    OnyxInputProps,
    | "label"
    | "hideLabel"
    | "modelValue"
    | "placeholder"
    | "autocapitalize"
    | "autofocus"
    | "name"
    | "readonly"
    | "disabled"
    | "minlength"
    | "maxlength"
    | "withCounter"
    | "message"
    | "skeleton"
  >;
