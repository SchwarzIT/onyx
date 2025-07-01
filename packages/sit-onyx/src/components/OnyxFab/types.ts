import type { DensityProp } from "../../composables/density";
import type { OnyxFlyoutMenuProps } from "../OnyxNavBar/modules/OnyxFlyoutMenu/types";

export type OnyxFabProps = DensityProp &
  Pick<OnyxFlyoutMenuProps, "alignment"> & {
    /**
     * (Aria) Label of the action button that describes the action.
     */
    label: string;
    /**
     * If `true`, the label will be visually hidden.
     * For accessibility / screen readers, the aria-label will still be set.
     */
    hideLabel?: boolean;
    /**
     * Icon to show in the action button. If `options` are provided as slot, a pre-defined icon will be displayed for toggling the options.
     */
    icon?: string;
  };
