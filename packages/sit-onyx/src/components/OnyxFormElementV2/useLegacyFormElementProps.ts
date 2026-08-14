import { computed, toValue, type ComputedRef, type MaybeRef } from "vue";
import type { CustomMessageType, FormMessages } from "../../composables/useFormElementError.js";
import { useForwardProps } from "../../utils/props.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";
import OnyxFormElementV2 from "./OnyxFormElementV2.vue";
import type {
  FormElementV2LabelOptions,
  FormElementV2Tooltip,
  OnyxFormElementV2Props,
} from "./types.js";

type UseLegacyFormElementOptions = {
  props: MaybeRef<Omit<SharedFormElementProps, "label"> & Pick<OnyxFormElementV2Props, "label">>;
  errorMessages: ComputedRef<FormMessages | undefined>;
};

/**
 * Composable for mapping the legacy props of `OnyxFormElement` based components
 * to the new `OnyxFormElementV2` based props.
 *
 * This is used for backwards compatibility until onyx version 2 so we don't introduce breaking
 * changes into existing components.
 */
export const useLegacyFormElementProps = ({
  props,
  errorMessages,
}: UseLegacyFormElementOptions) => {
  const labelOptions = computed(() => {
    const p = toValue(props);

    const options: FormElementV2LabelOptions =
      typeof p.label === "object" ? p.label : { label: p.label };

    return { hidden: p.hideLabel, tooltipText: p.labelTooltip, ...options };
  });

  const mappedProps = computed<OnyxFormElementV2Props>(() => {
    const p = toValue(props);

    return {
      ...p,
      label: labelOptions.value,
      message: customMessageToFormElementV2Message(p.message),
      success: customMessageToFormElementV2Message(p.success),
      error: customMessageToFormElementV2Message(errorMessages.value),
    };
  });

  const formElementV2Props = useForwardProps(mappedProps, OnyxFormElementV2);
  return { formElementV2Props };
};

export const customMessageToFormElementV2Message = (
  message?: CustomMessageType,
): string | FormElementV2Tooltip | undefined => {
  if (!message) return;
  if (typeof message === "string") return message;
  if (message.hidden) return;
  return { label: message.shortMessage, tooltipText: message.longMessage };
};
