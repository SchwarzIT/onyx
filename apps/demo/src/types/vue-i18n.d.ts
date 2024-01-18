import enUS from '@/i18n/locales/en-US.json';
import { datetimeFormats, numberFormats } from '@sit/vue-core';

type DateTimeSchema = (typeof datetimeFormats)['en'];
type NumberFormatSchema = (typeof numberFormats)['en'];
export type MessageSchema = typeof enUS;

/**
 * Provide type intellisense for translation keys and date/number formats.
 */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}
  // define the datetime format schema
  export interface DefineDateTimeFormat extends DateTimeSchema {}
  // define the number format schema
  export interface DefineNumberFormat extends NumberFormatSchema {}
}
