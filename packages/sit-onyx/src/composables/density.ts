import { computed } from "vue";

export const DENSITIES = ["compact", "default", "cozy"] as const;
export type Density = (typeof DENSITIES)[number];

export type DensityProp = {
  /**
   * Density defines the amount of vertical white space a component has and the height of the main (interactive) element of a component.
   * @default undefined By default the parents setting is used, if none is defined on any parent `default` is the default.
   */
  density?: Density;
};

export const useDensity = (props: DensityProp) => ({
  densityClass: computed(() => ({ [`onyx-density-${props.density}`]: !!props.density })),
});
