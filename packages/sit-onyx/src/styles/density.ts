const DENSITY = ["cozy", "default", "compact"] as const;
export type DensityType = (typeof DENSITY)[number];

export type DensityProp = {
  /**
   * Density defines the amount of vertical white space a component has and the height of the main (interactive) element of a component.
   */
  density?: DensityType;
};
