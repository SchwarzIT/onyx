import { computed, toValue, type MaybeRefOrGetter } from "vue";
import type { OnyxTooltipProps } from "../components/OnyxTooltip/types.js";
import { getFormMessageText, type FormMessages } from "./useFormElementError.js";

type UseErrorTooltipProps = {
  /**
   * We don't show an error if the content is not interactive
   */
  disabled?: MaybeRefOrGetter<boolean>;
  /**
   * The given component will be shown inside a tooltip when
   * errorMessages are provided. Without errorMessages, the
   * component will not be rendered inside a slot.
   */
  errorMessages?: MaybeRefOrGetter<FormMessages | undefined>;
};

export const useErrorTooltip = ({ disabled, errorMessages }: UseErrorTooltipProps) =>
  computed(() => {
    const text = getFormMessageText(toValue(errorMessages));
    return {
      disabled: toValue(disabled) || !text,
      trigger: "hover",
      color: "danger",
      text,
    } satisfies OnyxTooltipProps;
  });
