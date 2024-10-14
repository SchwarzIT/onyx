import type { DensityProp } from "../../composables/density";
import type { SkeletonProvidedProp } from "../../composables/useSkeletonState";
import type { FormProps } from "./OnyxForm.core";

export type OnyxFormProps = FormProps & Partial<SkeletonProvidedProp> & DensityProp;
