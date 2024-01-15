import type { ObjectToDottedStrings, TranslationValue } from "@/types/i18n";
import type { DeepPartial } from "@/types/utils";
import { computed, inject, provide, unref, type InjectionKey, type MaybeRef } from "vue";
import enUS from "./locales/en-US.json";

/** Available translations that are used by Onyx components. */
export type OnyxTranslations = typeof enUS;

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
   * https://onyx.schwarz/i18n/
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
};

const I18N_INJECTION_KEY = Symbol() as InjectionKey<ReturnType<typeof createI18n>>;

/**
 * Creates a new i18n instance.
 */
const createI18n = (options?: ProvideI18nOptions) => {
  /**
   * Current locale.
   * @default "en-US"
   */
  const locale = computed(() => unref(options?.locale) ?? "en-US");

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
  const t = computed(() => {
    return (
      key: ObjectToDottedStrings<OnyxTranslations>,
      placeholders: Record<string, string | number | undefined> = {},
    ): string => {
      // use English message as fallback
      let message = resolveMessage(key, messages.value) ?? resolveMessage(key, enUS) ?? "";

      if (placeholders) {
        Object.entries(placeholders).forEach(([key, value]) => {
          if (value === undefined) return;
          // "gi" is used to replace all occurrences because String.replaceAll() is not available
          // in our specified EcmaScript target
          message = message.replace(new RegExp(`{${key}}`, "gi"), value.toString());
        });
      }

      const pluralizationValue = typeof placeholders.n === "number" ? placeholders.n : undefined;
      return resolvePluralization(message, pluralizationValue);
    };
  });

  return { locale, t };
};

/**
 * Provides a global i18n instance that is used by Onyx.
 * Must only be called once in the `App.vue` file of a project that consumes Onyx.
 */
export const provideI18n = (options: ProvideI18nOptions) => {
  provide(I18N_INJECTION_KEY, createI18n(options));
};

/**
 * Injects the Onyx i18n instance.
 */
export const injectI18n = () => {
  const fallbackInstance = createI18n();
  return inject(I18N_INJECTION_KEY, fallbackInstance);
};

/**
 * Resolves the given dotted key (e.g. `a.b.c`) to the translation value of the given messages.
 * @returns Message value or undefined if translation does not exist.
 */
const resolveMessage = (
  key: ObjectToDottedStrings<OnyxTranslations>,
  messages: DeepPartial<OnyxTranslations>,
): string | undefined => {
  // see https://stackoverflow.com/a/6394168
  const message = key.split(".").reduce<TranslationValue | undefined>((obj, i) => {
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
