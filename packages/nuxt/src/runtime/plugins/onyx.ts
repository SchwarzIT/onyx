import { computed, type ComputedRef } from "#imports";
import type { LocaleObject } from "@nuxtjs/i18n";
import { defineNuxtPlugin, useNuxtApp, useRouter } from "nuxt/app";
import { createOnyx, type ProvideI18nOptions, type TranslationFunction } from "sit-onyx";
import type { Composer } from "vue-i18n";

type I18n = Composer & { localeProperties: ComputedRef<LocaleObject> };

export default defineNuxtPlugin({
  name: "onyx:plugin",
  dependsOn: [],
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

      const locale = computed(() => i18n.localeProperties.value.language ?? "en-US");

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
