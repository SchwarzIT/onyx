export const DENSITY = ["cozy", "default", "compact"] as const;
export type DensityType = (typeof DENSITY)[number];

export type DensityProp = {
  /**
   * Density setting aseaes
   */
  density?: DensityType;
};
