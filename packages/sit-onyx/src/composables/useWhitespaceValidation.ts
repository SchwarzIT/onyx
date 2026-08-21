import { computed, type Ref } from "vue";
import { injectI18n } from "../i18n/index.js";

export type WhitespaceValidationOptions = {
  modelValue: Ref<string | undefined | null>;
  props: { required?: boolean };
};

export const useWhitespaceValidation = ({ modelValue, props }: WhitespaceValidationOptions) => {
  const { t } = injectI18n();

  const whitespaceError = computed(() => {
    if (!props.required) return undefined;
    const rawText = String(modelValue.value ?? "").replace(/<[^>]*>/g, "");

    if (rawText.length > 0 && rawText.trim().length === 0) {
      return {
        shortMessage: t.value("validations.valueMissing.preview"),
        longMessage: t.value("validations.valueMissing.whitespaceError"),
      };
    }
    return undefined;
  });

  return { whitespaceError };
};
