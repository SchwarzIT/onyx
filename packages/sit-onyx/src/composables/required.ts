import { computed } from "vue";

const REQUIRED_MARKER = ["optional", "required"] as const;
export type RequiredMarkerType = (typeof REQUIRED_MARKER)[number];

export type RequiredMarkerProp = {
  /**
   * Whether the a value for this form element is required.
   */
  required?: boolean;
  /**
   * Required mode: `optional` will show an `(optional)` text after the label for optional inputs.
   * `required` will show an `*` indicator for required inputs after the label instead.
   * No marker will be visible if the label is hidden.
   * @default undefined By default the parents setting is used, if none is defined on any `required` is the default.
   */
  requiredMarker?: RequiredMarkerType;
};

export const useRequired = (props: RequiredMarkerProp) => ({
  /**
   * Class that configures which type of required marker is used.
   */
  requiredTypeClass: computed(() => ({
    [`onyx-use-${props.requiredMarker}`]: props.requiredMarker,
  })),
  requiredMarkerClass: computed(() => ({
    "onyx-required-marker": props.required,
    "onyx-optional-marker": !props.required,
  })),
});
