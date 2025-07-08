import type { OnyxTooltipProps } from "../OnyxTooltip/types.js";

export type OnyxInfoTooltipProps = Required<Pick<OnyxTooltipProps, "text">> &
  Omit<OnyxTooltipProps, "text" | "fitParent">;
