export const TEXT_SIZES = ["small", "default", "large"] as const;
export type TextSize = (typeof TEXT_SIZES)[number];

// when adding a new truncation type, make sure to also add CSS for it
// inside styles/fonts.scss
export const TRUNCATION_TYPES = ["ellipsis", "multiline"] as const;
export type TruncationType = (typeof TRUNCATION_TYPES)[number];
