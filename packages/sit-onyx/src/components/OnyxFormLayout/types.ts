import type { OnyxFormElementProps } from "../OnyxFormElement/types.js";

export type OnyxInputLayoutProps = Pick<
  OnyxFormElementProps<string>,
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
>;
