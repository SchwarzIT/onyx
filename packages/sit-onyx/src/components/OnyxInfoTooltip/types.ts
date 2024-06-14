import type { OnyxTooltipProps } from "../OnyxTooltip/types";

export type OnyxInfoTooltipProps = Required<Pick<OnyxTooltipProps, "text">> &
  Pick<OnyxTooltipProps, "position"> & {
    /**
     * Sets the aria-label of the info icon for accessibility / screen readers
     */ label?: string;
  };
