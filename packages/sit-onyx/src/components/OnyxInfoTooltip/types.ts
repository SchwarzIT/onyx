import type { OnyxTooltipProps } from "../OnyxTooltip/types";

export type OnyxInfoTooltipProps = Required<Pick<OnyxTooltipProps, "text">> &
  Pick<OnyxTooltipProps, "position" | "open">;
