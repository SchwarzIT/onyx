import { toValue, type MaybeRefOrGetter } from "vue";

/* todo add all the real texts */
const knownTranslations = {
  de: {
    patternMismatch: "de patternMismatch",
    tooLong: "de tooLong",
    tooShort: "de tooShort",
    rangeOverflow: "de rangeOverflow",
    rangeUnderflow: "de rangeUnderflow",
    typeMismatch: "de typeMismatch",
    valueMissing: "de valueMissing",
  },
  en: {
    patternMismatch: "en patternMismatch",
    tooLong: "en tooLong",
    tooShort: "en tooShort",
    rangeOverflow: "en rangeOverflow",
    rangeUnderflow: "en rangeUnderflow",
    typeMismatch: "en typeMismatch",
    valueMissing: "en valueMissing",
  },
};

export type SupportedErrorLangs = keyof typeof knownTranslations;

/** TODO: docs! */
export const useFormValidationMessage = (
  language: MaybeRefOrGetter<SupportedErrorLangs>,
  validityState: MaybeRefOrGetter<ValidityState>,
) => {
  if (toValue(validityState).valid) return "";

  const errorMessage = knownTranslations[toValue(language)];

  const currentState = toValue(validityState);
  if (currentState.valueMissing) return errorMessage.valueMissing;
  if (currentState.patternMismatch) return errorMessage.patternMismatch;
  if (currentState.tooLong) return errorMessage.tooLong;
  if (currentState.tooShort) return errorMessage.tooShort;
  if (currentState.rangeOverflow) return errorMessage.rangeOverflow;
  if (currentState.rangeUnderflow) return errorMessage.rangeUnderflow;
  if (currentState.typeMismatch) return errorMessage.typeMismatch;

  return "";
};
