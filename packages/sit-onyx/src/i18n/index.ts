import type { DeepPartial, ObjectToDottedStrings, TranslationValue } from "@/types";
import { computed, inject, provide, unref, type InjectionKey, type MaybeRef } from "vue";
import enUS from "./locales/en-US.json";

export type Translation = typeof enUS;

export type ProvideI18nOptions = {
  /**
   * Current locale / language to use.
   * If a ref is passed (e.g. the locale from the `vue-i18n` package)
   * all Onyx messages will be updated if it changes (if locale is supported).
   * If a message is missing for your currently set locale, English will be used as fallback.
   *
   * @default "en-US"
   */
  locale?: MaybeRef<string>;
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

  /**
   * Resolves the given dotted key (e.g. `a.b.c`) to the translation value of the given messages.
   * @returns Message value or undefined if translation does not exist.
   */
  const resolveMessage = (
    key: ObjectToDottedStrings<Translation>,
    messages: DeepPartial<Translation>,
  ): string | undefined => {
    // see https://stackoverflow.com/a/6394168
    const message = key.split(".").reduce<TranslationValue | undefined>((obj, i) => {
      if (!obj || typeof obj === "string") return obj;
      return obj[i];
    }, messages);

    return message && typeof message === "string" ? message : undefined;
  };

  /**
   * Gets the translation for the given key.
   * If message is not found for current locale, English fallback will be used.
   */
  const t = computed(() => {
    return (key: ObjectToDottedStrings<Translation>): string => {
      const message = resolveMessage(key, messages.value);
      // use English message as fallback
      return message ?? resolveMessage(key, enUS) ?? "";
    };
  });

  return { locale, t };
};

let i18n: ReturnType<typeof createI18n> | undefined;

/**
 * Provides a global i18n instance that is used by Onyx.
 * Should only be called once in the `App.vue` file.
 * Otherwise the `i18n` will be overridden which can cause unexpected behavior.
 */
export const provideI18n = (options: ProvideI18nOptions) => {
  i18n = createI18n(options);
  provide(I18N_INJECTION_KEY, i18n);
};

export const useI18n = () => {
  const fallbackValue = createI18n();
  return inject(I18N_INJECTION_KEY, fallbackValue);
};
