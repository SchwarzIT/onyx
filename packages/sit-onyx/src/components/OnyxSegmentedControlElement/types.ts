import type { DensityProp } from "../../composables/density.js";
import type {
  OnyxSegmentedControlOption,
  OnyxSegmentedControlProps,
} from "../OnyxSegmentedControl/types.js";

export type OnyxSegmentedControlElement = OnyxSegmentedControlOption &
  Pick<OnyxSegmentedControlProps, "name"> &
  DensityProp & {
    checked?: boolean;
  };
