import enUS from "../../i18n/locales/en-US.json";

/**
 * Input types that have a translation for their validation error message.
 */
export const TRANSLATED_INPUT_TYPES = Object.keys(
  enUS.validations.typeMismatch,
) as (keyof typeof enUS.validations.typeMismatch)[];
export type TranslatedInputType = (typeof TRANSLATED_INPUT_TYPES)[number];
