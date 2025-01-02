import type { OnyxTooltipProps } from "../OnyxTooltip/types";

export type OnyxInfoTooltipProps = Required<Pick<OnyxTooltipProps, "text">> &
  Omit<OnyxTooltipProps, "text" | "fitParent">;
