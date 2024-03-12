const DENSITY = ["cozy", "default", "compact"] as const;
export type DensityType = (typeof DENSITY)[number];

export type DensityProp = {
  /**
   * Density defines the base height of the interactive main element of a component.
   */
  density?: DensityType;
};
