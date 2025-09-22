import { ref, toValue, watch, type Directive, type MaybeRefOrGetter } from "vue";
import { areObjectsFlatEqual } from "../utils/objects.js";
import { transformValidityStateToObject } from "../utils/validity.js";

export type CustomMessageType = string | FormMessages;

export type UseFormValidityOptions<
  TProps extends Record<string, MaybeRefOrGetter<unknown>> = Record<
    string,
    MaybeRefOrGetter<unknown>
  >,
> = {
  /**
   * Explicitly set custom error. Any non-nullish value will set the input to be invalid.
   */
  error?: MaybeRefOrGetter<CustomMessageType | undefined>;
  /**
   * Props that influence native validation state.
   */
  props: TProps;
  /**
   * Component emit as defined with `const emit = defineEmits()`
   */
  emit: (evt: "validityChange", validity: ValidityState) => void;
};

export type InputValidationElement = Pick<HTMLInputElement, "validity" | "setCustomValidity">;

export type FormMessages = {
  /**
   * A short message preview to inform the user about the input state.
   * It's usually shown directly underneath the input field.
   */
  shortMessage: string;
  /**
   * An extended informative message to provide more details.
   * It's usually shown in a tooltip next to the shortMessage.
   */
  longMessage?: string;
  /**
   * Will visually hide the message.
   */
  hidden?: boolean;
};

/**
 * Transforms a customMessage into the format needed to display an error preview and extended message
 */
export const getFormMessages = (customMessage?: CustomMessageType): FormMessages | undefined => {
  if (!customMessage) return;
  if (typeof customMessage === "string") {
    // we can't guarantee a custom message will be short,
    // so in case it overflows, by adding it to "longMessage",
    // it will still be visible in a tooltip
    return { shortMessage: customMessage, longMessage: customMessage, hidden: false };
  }
  return customMessage;
};

/**
 * Returns a string combining short + long message or just the customMessage if it was provided as single string.
 * Will be used e.g. for customInvalidity and showing a tooltip e.g. in RadioButtons
 */
export const getFormMessageText = (error?: CustomMessageType): string | undefined => {
  if (!error) return;
  if (typeof error === "string") {
    return error;
  }
  if (error.shortMessage === error.longMessage) {
    return error.shortMessage;
  }
  const { shortMessage, longMessage } = error;
  return `${shortMessage}: ${longMessage}`;
};

export const useCustomValidity = <TProps extends Record<string, MaybeRefOrGetter<unknown>>>(
  options: Omit<UseFormValidityOptions<TProps>, "emit">,
) => {
  const validityState = ref<Record<keyof ValidityState, boolean>>();

  const vCustomValidity = {
    mounted: (el) => {
      watch(
        // we need to watch all props instead of only modelValue so the validity is re-checked
        // when the validation rules change
        [() => toValue(options.error), () => toValue(options.props)],
        () => {
          el.setCustomValidity(getFormMessageText(toValue(options.error)) ?? "");
          const newValidityState = transformValidityStateToObject(el.validity);

          // do not emit update if input is valid and has never been invalid
          if (!validityState.value && newValidityState.valid) return;

          // ignore if actual validity state value is unchanged
          if (validityState.value && areObjectsFlatEqual(newValidityState, validityState.value)) {
            return;
          }

          validityState.value = newValidityState;
        },
        // We use "post" flush timing, to ensure the DOM is up-to-date and the elements validity state is in sync.
        { immediate: true, deep: true, flush: "post" },
      );
    },
  } satisfies Directive<InputValidationElement, undefined>;

  return {
    /**
     * Directive to set the custom error message and emit validityChange event.
     */
    vCustomValidity,
    /**
     * validityState of the html element.
     */
    validityState,
  };
};
