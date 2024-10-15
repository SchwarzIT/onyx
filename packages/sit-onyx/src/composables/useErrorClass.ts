import { computed, type Ref } from "vue";

/**
 * All possible `showError` values.
 */
export const ShowErrorModes = [true, false, "touched"] as const;

/**
 * Configures if and when errors are shown.
 * When `true`, errors will be shown initially.
 * When `false`, errors will never be shown.
 * `"touched"` only shows an error *after* a user has significantly interacted with the input.
 * See [:user-invalid](https://drafts.csswg.org/selectors/#user-invalid-pseudo).
 */
export type ShowErrorMode = (typeof ShowErrorModes)[number];

export const useErrorClass = (showError: Readonly<Ref<ShowErrorMode>>) =>
  computed(() => {
    if (showError.value === true) {
      return "onyx-form-element--immediate-invalid";
    }
    if (showError.value === false) {
      return "onyx-form-element--suppress-invalid";
    }
    return "onyx-form-element--touched-invalid";
  });
