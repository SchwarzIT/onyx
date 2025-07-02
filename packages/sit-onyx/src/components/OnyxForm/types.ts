import type { DensityProp } from "../../composables/density.js";
import type { SkeletonProvidedProp } from "../../composables/useSkeletonState.js";
import type { FormProps } from "./OnyxForm.core.js";

export type OnyxFormProps = FormProps & Partial<SkeletonProvidedProp> & DensityProp;
