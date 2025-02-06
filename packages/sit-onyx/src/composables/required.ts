import { computed, type Ref } from "vue";

export const RequiredMarkerTypes = ["optional", "required"] as const;
export type RequiredMarkerType = (typeof RequiredMarkerTypes)[number];

export type RequiredProp = {
  /**
   * Whether the a value for this form element is required.
   */
  required?: boolean;
};

export const useRequired = (
  props: RequiredProp,
  requiredMarker: Readonly<Ref<RequiredMarkerType>>,
) => ({
  /**
   * Class that configures which type of required marker is used.
   */
  requiredTypeClass: computed(() => ({
    [`onyx-use-${requiredMarker.value}`]: true,
  })),
  requiredMarkerClass: computed(() => ({
    "onyx-required-marker": props.required,
    "onyx-optional-marker": !props.required,
  })),
});
