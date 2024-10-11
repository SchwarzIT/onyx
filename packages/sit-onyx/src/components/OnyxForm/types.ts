import type { DensityProp } from "../../composables/density";
import type { SkeletonProvidedProp } from "../../composables/useSkeletonState";
import type { FormInjectedProps } from "./OnyxForm.core";

export type OnyxFormProps = Partial<FormInjectedProps> &
  Partial<SkeletonProvidedProp> &
  DensityProp;
