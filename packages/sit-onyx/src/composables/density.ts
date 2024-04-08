import { computed } from "vue";

export const DENSITY = ["cozy", "default", "compact"] as const;
export type DensityType = (typeof DENSITY)[number];

export type DensityProp = {
  /**
   * Density defines the amount of vertical white space a component has and the height of the main (interactive) element of a component.
   * @default undefined By default the parents setting is used, if none is defined on any parent `default` is the default.
   */
  density?: DensityType;
};

export const useDensity = (props: DensityProp) => ({
  densityClass: computed(() => ({ [`onyx-density-${props.density}`]: props.density })),
});
