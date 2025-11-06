import type { DensityProp } from "../../composables/density.js";
import type { OnyxButtonProps } from "../OnyxButton/types.js";
import type { WithLinkProp } from "../OnyxRouterLink/types.js";

export type OnyxGlobalSearchOptionProps = DensityProp &
  WithLinkProp<true> &
  Pick<OnyxButtonProps, "autofocus"> & {
    label: string;
    icon?: string;
  };
