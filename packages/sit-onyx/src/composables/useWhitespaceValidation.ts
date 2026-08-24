import { computed, type Ref } from "vue";
import { injectI18n } from "../i18n/index.js";
import type { Nullable } from "../types/utils.js";

export type WhitespaceValidationOptions = {
  modelValue?: Ref<Nullable<string>>;
  props: { required?: boolean };
};

export const useWhitespaceValidation = ({ modelValue, props }: WhitespaceValidationOptions) => {
  const { t } = injectI18n();

  const whitespaceError = computed(() => {
    if (!props.required) return undefined;

    const val = modelValue?.value ?? "";

    if (val.length > 0 && val.trim().length === 0) {
      return {
        shortMessage: t.value("validations.valueMissing.preview"),
        longMessage: t.value("validations.valueMissing.whitespaceError"),
      };
    }
    return undefined;
  });

  return { whitespaceError };
};
