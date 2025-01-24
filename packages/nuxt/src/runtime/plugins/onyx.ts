import { computed, type ComputedRef } from "#imports";
import type { LocaleObject } from "@nuxtjs/i18n";
import { defineNuxtPlugin, useNuxtApp, useRouter } from "nuxt/app";
import { createOnyx, type TranslationFunction } from "sit-onyx";
import type { Composer } from "vue-i18n";

type I18n = Composer & { localeProperties: ComputedRef<LocaleObject> };

export default defineNuxtPlugin({
  name: "onyx:plugin",
  // @ts-ignore: dependency comes from @nuxtjs/i18n
  dependsOn: ["i18n:plugin"],
  setup: (app) => {
    // This plugin is only added if the i18n module was added as well so it's safe to assume $i18n was provided
    const { t: translate, localeProperties } = useNuxtApp().$i18n as I18n;
    const router = useRouter();

    const t = computed((): TranslationFunction => {
      return (key, placeholders) => {
        return translate(`onyx.${key}`, placeholders?.n ?? 1, { named: placeholders });
      };
    });

    app.vueApp.use(
      createOnyx({
        i18n: {
          locale: computed(
            () => localeProperties.value.language ?? localeProperties.value.iso ?? "en-US",
          ),
          t,
        },
        router,
      }),
    );
  },
});
