import type { Composer } from "vue-i18n";
import type { LocaleObject } from "@nuxtjs/i18n";
import { computed, watchEffect, type ComputedRef } from "#imports";
import { defineNuxtPlugin, useNuxtApp } from "nuxt/app";
import { provideI18n, syncGlobalOptionalText, type TranslationFunction } from "sit-onyx";

type I18n = Composer & { localeProperties: ComputedRef<LocaleObject> };

export default defineNuxtPlugin({
  name: "onyx:plugin",
  // @ts-ignore: dependency comes from @nuxtjs/i18n
  dependsOn: ["i18n:plugin"],
  setup: (app) => {
    // This plugin is only added if the i18n module was added as well so it's safe to assume $i18n was provided
    const { t: translate, localeProperties } = useNuxtApp().$i18n as I18n;

    const t = computed((): TranslationFunction => {
      return (key, placeholders) => {
        return translate(`onyx.${key}`, placeholders?.n ?? 1, { named: placeholders });
      };
    });

    provideI18n(app.vueApp, {
      locale: computed(() => localeProperties.value.iso ?? "en-US"),
      t,
    });

    /**
     * The translation for the key "optional" is used within the css.
     * Calling syncGlobalOptionalText sets the css variable used for that to the current translation.
     * This needs to be done within a client side hook as the function will access the document to set the css variable globally.
     */
    app.hook("app:beforeMount", () => {
      watchEffect(() => {
        syncGlobalOptionalText(translate(`onyx.optional`));
      });
    });
  },
});
