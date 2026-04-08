import type { SharedTextInputProps } from "../../composables/useLenientMaxLengthValidation.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";
import type { OnyxFormElementV2Props } from "../OnyxFormElementV2/types.js";

export type OnyxTextareaProps = Omit<SharedFormElementProps, "label"> &
  Pick<
    SharedTextInputProps,
    "modelValue" | "autocapitalize" | "minlength" | "maxlength" | "withCounter"
  > &
  Pick<OnyxFormElementV2Props, "label"> & {
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
