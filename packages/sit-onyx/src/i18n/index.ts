import type { DeepPartial, ObjectToDottedStrings } from "@/types";
import { computed, inject, provide, unref, type InjectionKey, type MaybeRef } from "vue";
import enUS from "./locales/en-US.json";

export type Translation = typeof enUS;

export type ProvideI18nOptions = {
  /**
   * Current locale / language to use.
   * If a ref is passed (e.g. the locale from the `vue-i18n` package)
   * all Onyx messages will be updated if it changes (if locale is supported).
   *
   * @default "en-US"
   */
  locale?: MaybeRef<string>;
  /**
   * Locale to use a translation is missing for the current locale.
   * @default "en-US"
   */
  fallbackLocale?: MaybeRef<string>;
  /**
   * Available translations / messages. English is always supported. For build-in translations, see:
   * https://github.com/SchwarzIT/onyx/tree/main/packages/sit-onyx/src/i18n/locales
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
  messages?: Record<string, DeepPartial<Translation>>;
};

const I18N_INJECTION_KEY = Symbol() as InjectionKey<NonNullable<typeof i18n>>;

const createI18n = (options?: ProvideI18nOptions) => {
  const locale = computed(() => unref(options?.locale) ?? "en-US");

  const messages = computed(() => {
    if (options?.messages && locale.value in options.messages) {
      return options.messages[locale.value];
    }
    return enUS;
  });

  /** Gets the translation for the given key. */
  const t = computed(() => {
    return (key: ObjectToDottedStrings<Translation>): string => {
      // see https://stackoverflow.com/a/6394168
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return key.split(".").reduce((obj, i) => (obj as any)[i], messages.value);
    };
  });

  return { locale, t };
};

let i18n: ReturnType<typeof createI18n> | undefined;

/**
 * Provides a global i18n instance that is used by Onyx.
 * Should only be called once in the `App.vue` file.
 */
export const provideI18n = (options: ProvideI18nOptions) => {
  if (!i18n) i18n = createI18n(options);
  provide(I18N_INJECTION_KEY, i18n);
};

export const useI18n = () => {
  const fallbackValue = createI18n();
  return inject(I18N_INJECTION_KEY, fallbackValue);
};
