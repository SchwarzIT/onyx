import { computed, inject, readonly, toRef, type App, type InjectionKey, type MaybeRef } from "vue";
import type { DateValue } from "../components/OnyxDatePicker/types.js";
import type { FlattenedKeysOf, TranslationValue } from "../types/i18n.js";
import type { DeepPartial } from "../types/utils.js";
import { DATETIME_FORMATS, type DatetimeFormat } from "./datetime-formats.js";
import enUS from "./locales/en-US.json";
import { NUMBER_FORMATS, type NumberFormat } from "./number-formats.js";

/**
 * The type of the imported `enUS` above is a concrete type so the value type of each message
 * is e.g. "{ myKey: 'HelloWorld'}" but it should be "{ myKey: string }".
 * This utility type converts all values to be of type string (more generic)
 * so we can actually use other locales as well.
 */
type GetTypeOfTranslations<T> = T extends object
  ? { [P in keyof T]?: GetTypeOfTranslations<T[P]> }
  : string;

/** Available translations that are used by onyx components. */
export type OnyxTranslations = GetTypeOfTranslations<typeof enUS>;

export type OnyxTranslationKey = FlattenedKeysOf<OnyxTranslations>;

export type OnyxNumberFormatOptions = NumberFormat | Intl.NumberFormatOptions;
export type OnyxDateFormatOptions = DatetimeFormat | Intl.DateTimeFormatOptions;

export type ProvideI18nOptions = {
  /**
   * Current locale / language to use.
   * If a ref is passed (e.g. the locale from the `vue-i18n` package)
   * all onyx messages will be updated if it changes (if locale is supported).
   * If a message is missing for your currently set locale, English will be used as fallback.
   *
   * The should be in the BCP 47 format as it's used to localize date times using the native [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
   *
   * @default "en-US"
   */
  locale?: MaybeRef<string>;
  /**
   * Available translations / messages. English is always supported. For build-in translations, see:
   * https://onyx.schwarz/development/i18n.html
   *
   * @example
   * ```ts
   * import deDE from "sit-onyx/locales/de-DE.json";
   * {
   *   messages: {
   *     // English is always supported so we don't need to add it here
   *     'de-DE': deDE
   *   }
   * }
   * ```
   */
  messages?: Record<string, DeepPartial<OnyxTranslations>>;
  /**
   * Custom translation function. This option can be used to pass a custom function for translations to onyx in case you want your i18n library to handle them.
   * @example
   * ```ts
   * import { useI18n } from "vue-i18n";
   *
   * const { t } = useI18n();
   * {
   *   t: computed((key, placeholders) => t(`onyx.${key}`, placeholders?.n ?? 1, { named: placeholders }))
   * }
   * ```
   *
   * Note: If a custom `t` function is used, passed messages will not be used.
   */
  t?: MaybeRef<TranslationFunction>;
};

export type TranslationFunction = (
  key: OnyxTranslationKey,
  /** Named values to interpolate into the translation. The property `n` is special as it represents the number of elements for pluralization. */
  placeholders?: Record<string, string | number | undefined> & { n?: number },
) => string;

export const I18N_INJECTION_KEY = Symbol() as InjectionKey<OnyxI18n>;

export type OnyxI18n = ReturnType<typeof createI18n>;

/**
 * Creates a new i18n instance.
 */
export const createI18n = (options: ProvideI18nOptions = {}) => {
  /**
   * Current locale.
   * @default "en-US"
   */
  const locale = readonly(toRef(options?.locale ?? "en-US"));

  const messages = computed(() => {
    if (options?.messages && locale.value in options.messages) {
      return options.messages[locale.value];
    }
    return enUS;
  });

  /**
   * Gets the translation for the given key.
   * If message is not found for current locale, English fallback will be used.
   * @param placeholders Placeholders that will be replaced in the message string
   * For pluralization, you must provide the placeholder `n`.
   */
  const t = computed((): TranslationFunction => {
    return (key, placeholders = {}) => {
      // use English message as fallback
      let message = resolveMessage(key, messages.value) ?? resolveMessage(key, enUS) ?? "";
      message = resolvePluralization(message, placeholders.n);
      return replacePlaceholders(message, placeholders);
    };
  });

  /**
   * Gets the formatted date/time string for the given date and format depending on the current locale.
   */
  const d = computed(() => {
    return (date: DateValue, format?: OnyxDateFormatOptions) => {
      const formatter = new Intl.DateTimeFormat(
        locale.value,
        typeof format === "object" || format === undefined ? format : DATETIME_FORMATS[format],
      );
      return formatter.format(new Date(date));
    };
  });

  /**
   * Gets the formatted number string for the given number and format depending on the current locale.
   */
  const n = computed(() => {
    return (value: number, format?: OnyxNumberFormatOptions) => {
      const formatter = new Intl.NumberFormat(
        locale.value,
        typeof format === "object" || format === undefined ? format : NUMBER_FORMATS[format],
      );
      return formatter.format(value);
    };
  });

  return {
    // If the user provided a custom `t` function, it is used instead of the default.
    t: options.t ? readonly(toRef(options.t)) : t,
    locale,
    d,
    n,
  };
};

/**
 * Provides a global i18n instance that is used by onyx.
 * Must only be called once in the `App.vue` file of a project that consumes onyx.
 */
export const provideI18n = (app: App, options?: ProvideI18nOptions) => {
  const i18n = createI18n(options);
  app.provide(I18N_INJECTION_KEY, i18n);
  return i18n;
};

/**
 * Injects the onyx i18n instance.
 * Creates a fallback if provide was never called.
 */
export const injectI18n = () => {
  return inject(I18N_INJECTION_KEY, () => createI18n(), true);
};

/**
 * Resolves the given flattened key (e.g. `a.b.c`) to the translation value of the given messages.
 * @returns Message value or undefined if translation does not exist.
 */
const resolveMessage = (
  key: OnyxTranslationKey,
  messages: DeepPartial<OnyxTranslations>,
): string | undefined => {
  // see https://stackoverflow.com/a/6394168
  const message = key.split(".").reduce<TranslationValue | undefined>((obj, i) => {
    // this condition can logically not be reached but we need it for TypeScript
    // due to the .reduce() function
    if (!obj || typeof obj === "string") return obj;
    return obj[i];
  }, messages);

  return message && typeof message === "string" ? message : undefined;
};

/**
 * Returns the pluralized message (if multiple formats are defined using `" | "` separator.
 */
const resolvePluralization = (message: string, value?: number) => {
  const formats = message.split(" | ").map((i) => i.trim());
  if (formats.length <= 1) return message;

  let pluralization: 0 | 1 | 2 = 1;
  if (value === 0) pluralization = 0;
  if (value && (value <= 0 || value > 1)) pluralization = 2;

  if (formats.length === 2) {
    return pluralization === 1 ? formats[0] : formats[1];
  }

  return formats[pluralization];
};

/**
 * Replaces all placeholders in the given message.
 * If a value is provided, it will be replaced accordingly. Otherwise the placeholder
 * will be removed from the message (same behavior as "vue-i18n").
 */
const replacePlaceholders = (
  message: string,
  placeholders: Record<string, string | number | undefined>,
): string => {
  if (!placeholders) return message;

  let replacedMessage = Object.entries(placeholders).reduce((replacedMessage, [key, value]) => {
    if (value === undefined) return replacedMessage;
    // "gi" is used to replace all occurrences because String.replaceAll() is not available
    // in our specified EcmaScript target
    return replacedMessage.replace(new RegExp(`{${key}}`, "gi"), value.toString());
  }, message);

  // replace string literals, e.g. replace {'@'} with @
  // see: https://vue-i18n.intlify.dev/guide/essentials/syntax#special-characters
  replacedMessage = replacedMessage.replace(/{'(.*?)'}/g, "$1");

  // remove all left-over placeholders that have no provided value to align with "vue-i18n"
  return replacedMessage.replace(/{.*}\s?/gi, "");
};
