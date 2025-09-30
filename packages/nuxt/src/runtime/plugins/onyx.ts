import { computed, type ComputedRef } from "#imports";
import type { LocaleObject } from "@nuxtjs/i18n";
import { defineNuxtPlugin, useNuxtApp, useRouter } from "nuxt/app";
import { createOnyx, type ProvideI18nOptions, type TranslationFunction } from "sit-onyx";
import type { Composer } from "vue-i18n";

type I18n = Composer & { localeProperties: ComputedRef<LocaleObject> };

export default defineNuxtPlugin({
  name: "onyx:plugin",
  dependsOn: [],
  // "parallel: false" is the current default but to be resistant for future changes, we explicitly set it to false here
  // see: https://github.com/SchwarzIT/onyx/pull/3832#discussion_r2244487744
  parallel: false,
  setup: (app) => {
    const i18n = useNuxtApp().$i18n as I18n | undefined;
    const router = useRouter();

    const getI18nOptions = (): ProvideI18nOptions | undefined => {
      if (!i18n) return;

      const t = computed((): TranslationFunction => {
        return (key, placeholders) => {
          return i18n.t(`onyx.${key}`, placeholders?.n ?? 1, { named: placeholders });
        };
      });

      const locale = computed(
        // since onyx uses BCP47 language codes, we prefer the language property here but fall back to the code if not specified
        () => i18n.localeProperties.value.language ?? i18n.localeProperties.value.code ?? "en-US",
      );

      return { t, locale };
    };

    app.vueApp.use(
      createOnyx({
        router,
        i18n: getI18nOptions(),
      }),
    );
  },
});
