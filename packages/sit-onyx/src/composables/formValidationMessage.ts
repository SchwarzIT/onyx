import { toValue, type MaybeRefOrGetter } from "vue";

/* todo add all the real texts */
const knownTranslations = {
  de: {
    tooShort: "Verlängere diesen Text auf mindestens x Zeichen. Derzeit verwendest du y Zeichen.",
    tooLong: "Kürze diesen Text auf max. x Zeichen. Zurzeit verwendest du y Zeichen.",
    rangeOverflow: "Wert muss kleiner als oder gleich x sein.",
    rangeUnderflow: "Wert muss größer als oder gleich x sein.",
    typeMismatch:
      "Die E-Mail-Adresse muss ein @-Zeichen enthalten. In der Angabe 'xxx' fehlt ein @-Zeichen.",
    patternMismatch: "Deine Eingabe muss mit dem geforderten Format übereinstimmen.",
    valueMissing: "Fülle dieses Feld aus.",
  },
  en: {
    tooShort:
      "Please lengthen this text to x characters or more (you are currently using y characters).",
    tooLong:
      "Please shorten this text to x characters or less (you are currently using y characters).",
    rangeOverflow: "Value must be less than or equal to x.",
    rangeUnderflow: "Value must be greater than or equal to x.",
    typeMismatch: "Please include an '@' in the email address. 'xxx' is missing an '@'.",
    patternMismatch: "Please match the format requested.",
    valueMissing: "Please fill in this field.",
  },
};

export type SupportedErrorLangs = keyof typeof knownTranslations;

/** TODO: 1. describing docs!
 * TODO: 2. we need to pass over value and the NativeInputProps as well.
 */
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
