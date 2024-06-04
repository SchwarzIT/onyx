import type { OnyxTooltipProps } from "../OnyxTooltip/types";

export type OnyxInfoTooltipProps = NonNullable<Pick<OnyxTooltipProps, "text">> &
  Pick<OnyxTooltipProps, "position">;
