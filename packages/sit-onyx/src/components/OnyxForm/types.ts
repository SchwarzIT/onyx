import type { DensityProp } from "../../composables/density";
import type { ShowErrorModes } from "../../composables/useErrorClass";

export type OnyxFormProps = {
  disabled?: boolean;
  showError?: ShowErrorModes;
} & DensityProp;
