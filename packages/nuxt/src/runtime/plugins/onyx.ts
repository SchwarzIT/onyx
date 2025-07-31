import { computed, type ComputedRef } from "#imports";
import type { LocaleObject } from "@nuxtjs/i18n";
import { defineNuxtPlugin, useNuxtApp, useRouter } from "nuxt/app";
import { createOnyx, type TranslationFunction } from "sit-onyx";
import { type Composer } from "vue-i18n";

type I18n = Composer & { localeProperties: ComputedRef<LocaleObject> };

export default defineNuxtPlugin({
  name: "onyx:plugin",
  dependsOn: [],
  setup: (app) => {
    const i18n = useNuxtApp().$i18n as I18n | undefined;
    const router = useRouter();

    app.vueApp.use(
      createOnyx({
        router,
        i18n: i18n
          ? {
              locale: computed(() => i18n.localeProperties.value.language ?? "en-US"),
              t: computed((): TranslationFunction => {
                return (key, placeholders) => {
                  return i18n.t(`onyx.${key}`, placeholders?.n ?? 1, { named: placeholders });
                };
              }),
            }
          : undefined,
      }),
    );
  },
});
