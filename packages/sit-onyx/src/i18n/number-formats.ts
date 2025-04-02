export const NUMBER_FORMATS = {
  decimal: { style: "decimal" },
} satisfies Record<string, Intl.NumberFormatOptions>;

export type NumberFormat = keyof typeof NUMBER_FORMATS;
