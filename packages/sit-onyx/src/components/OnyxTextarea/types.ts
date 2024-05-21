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
  > & {
    /**
     * Override the default autosize behavior (height adjusts based on the current value).
     * By default, the textarea will autosize while maintaining at least 3 and at most 10 rows.
     * If the user resizes the textarea manually, the autosize will no longer work and the height
     * set by the user is used.
     */
    autosize?: TextareaAutosize;
    /**
     * If `true`, the user will not be able to manually resize the textarea by dragging the bottom right corner.
     */
    disableManualResize?: boolean;
  };

export type TextareaAutosize = {
  /**
   * Sets the min height to the given number of rows/lines.
   * Must be `>= 2`. Will also be considered if the user resizes manually.
   */
  min?: number;
  /**
   * Sets the max height to the given number of rows/lines.
   * If omitted, the textarea can grow unlimited.
   * Will be ignored if the user resizes manually.
   */
  max?: number;
};
