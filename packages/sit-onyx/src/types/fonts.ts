export const TEXT_SIZES = ["small", "default", "large"] as const;
export type TextSize = (typeof TEXT_SIZES)[number];

export const TRUNCATION_TYPES = ["ellipsis", "multiline"] as const;
export type TruncationType = (typeof TRUNCATION_TYPES)[number];
