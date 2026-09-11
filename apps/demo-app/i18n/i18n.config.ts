import type {
  I18nOptions,
  IntlDateTimeFormat,
  IntlDateTimeFormats,
  IntlNumberFormats,
} from "vue-i18n";

const dateFormats = {
  date: {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  },
} satisfies IntlDateTimeFormat;

const datetimeFormats = {
  "en-US": dateFormats,
  "de-DE": dateFormats,
} satisfies IntlDateTimeFormats;

const numberFormats = {
  "en-US": {
    currency: {
      style: "currency",
      currency: "USD",
    },
  },
  "de-DE": {
    currency: {
      style: "currency",
      currency: "EUR",
    },
  },
} satisfies IntlNumberFormats;

export default {
  datetimeFormats,
  numberFormats,
} satisfies I18nOptions;
