export const ONYX_COLORS = ["primary", "neutral", "danger", "warning", "success", "info"] as const;
export type OnyxColor = (typeof ONYX_COLORS)[number];
