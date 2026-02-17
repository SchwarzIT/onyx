import type { OnyxFormElementProps } from "../OnyxFormElement/types.js";

export type OnyxInputLayoutProps = Pick<
  OnyxFormElementProps<string | number>,
  | "label"
  | "hideLabel"
  | "density"
  | "errorMessages"
  | "labelTooltip"
  | "loading"
  | "skeleton"
  | "required"
  | "requiredMarker"
  | "reserveMessageSpace"
  | "showError"
  | "successMessages"
  | "withCounter"
  | "maxlength"
  | "message"
  | "modelValue"
> & {
  /**
   * Whether to hide the clear icon.
   */
  hideClearIcon?: boolean;
};
