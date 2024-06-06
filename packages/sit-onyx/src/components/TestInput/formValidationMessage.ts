import { toValue, type MaybeRefOrGetter } from "vue";

type FormElementType = "email" | "number" | "password" | "search" | "tel" | "text" | "url";

export type FormElementProps = Partial<{
  required: boolean;
  pattern: string;
  type: FormElementType;
  max: number | string;
  maxLength: number;
  min: number | string;
  /** expected minimal length of a string value. Warning: when the value is (pre)set by code,
   * the input invalidity can not be detected by the browser, it will only show as invalid
   * as soon as a user interacts with the input (types something).
   */
  minLength: number;
}>;

export type SupportedErrorLangs = keyof typeof knownTranslations;

/** Analyses the given validity state and returns the corresponding error message in the given language.
 * Returns an empty string in case there is no error.
 *
 * @example
 * ```ts
 * useFormValidationMessage(
 *   'en',
 *   { valid: false, valueMissing: true, ... },
 *   { modelValue: '', ... }
 * ) => "Please fill in this field."
 * ```
 */
export const useFormValidationMessage = (
  language: MaybeRefOrGetter<SupportedErrorLangs>,
  validityState: MaybeRefOrGetter<ValidityState>,
  props: FormElementProps & { modelValue: string | number },
) => {
  if (toValue(validityState).valid) return "";

  const errorMessage = knownTranslations[toValue(language)];
  const currentState = toValue(validityState);
  if (currentState.valueMissing) return errorMessage.valueMissing;
  if (currentState.patternMismatch) return errorMessage.patternMismatch;
  if (currentState.tooLong) return errorMessage.tooLong(props.modelValue, props.maxLength!);
  if (currentState.tooShort) return errorMessage.tooShort(props.modelValue, props.minLength!);
  if (currentState.rangeOverflow) return errorMessage.rangeOverflow(`${props.max}`);
  if (currentState.rangeUnderflow) return errorMessage.rangeUnderflow(`${props.min}`);
  if (currentState.typeMismatch) return errorMessage.typeMismatch(props.modelValue, props.type!);

  return "";
};

/** Translations for all relevant error cases, partially considering the current value/limit/type */
const knownTranslations = {
  de: {
    tooShort: (value: string | number, limit: number) =>
      `Verlängere diesen Text auf mindestens ${limit} Zeichen. Derzeit verwendest du ${
        value.toString().length
      } Zeichen.`,
    tooLong: (value: string | number, limit: number) =>
      `Kürze diesen Text auf max. ${limit} Zeichen. Zurzeit verwendest du ${
        value.toString().length
      } Zeichen.`,
    rangeOverflow: (limit: string) => `Wert muss kleiner als oder gleich ${limit} sein.`,
    rangeUnderflow: (limit: string) => `Wert muss größer als oder gleich ${limit} sein.`,
    typeMismatch: (value: string | number, type: FormElementType) => {
      switch (type) {
        case "email":
          return `'${value}' muss eine Valide E-Mail-Adresse sein.${
            value.toString().includes("@") ? "" : " Bitte verwende ein @-Zeichen im Text."
          } `;
        case "number":
          return `'${value}' muss eine Zahl sein.`;
        case "tel":
          return `'${value}' muss eine gültige Telefonnummer sein.`;
        case "url":
          return `'${value}' muss eine gültige URL sein.`;
        default:
          `'${value}' entspricht nicht dem erwarten Typ.`;
      }
    },
    patternMismatch: "Deine Eingabe muss mit dem geforderten Format übereinstimmen.",
    valueMissing: "Fülle dieses Feld aus.",
  },
  en: {
    tooShort: (value: string | number, limit: number) => {
      const length = value.toString().length;
      return `Please lengthen this text to ${limit} characters or more (you are currently using ${length} character${
        length === 1 ? "" : "s"
      }).`;
    },
    tooLong: (value: string | number, limit: number) => {
      const length = value.toString().length;
      return `Please shorten this text to ${limit} characters or less (you are currently using ${
        value.toString().length
      } character${length === 1 ? "" : "s"}).`;
    },
    rangeOverflow: (limit: string) => `Value must be less than or equal to ${limit}.`,
    rangeUnderflow: (limit: string) => `Value must be greater than or equal to ${limit}.`,
    typeMismatch: (value: string | number, type: FormElementType) => {
      switch (type) {
        case "email":
          return `'${value}' must be a valid email address.${
            value.toString().includes("@") ? "" : " Please include '@' inside the text."
          } `;
        case "number":
          return `'${value}' must be a number.`;
        case "tel":
          return `'${value}' must be a valid phone number.`;
        case "url":
          return `'${value}' must be a valid URL.`;
        default:
          `'${value}' does not match the excpected type.`;
      }
    },
    patternMismatch: "Please match the format requested.",
    valueMissing: "Please fill in this field.",
  },
};
