import { injectI18n, provideI18n, type ProvideI18nOptions } from "@/i18n";
import { type Plugin, watchEffect } from "vue";

export type OnyxPluginOptions = {
  i18n?: ProvideI18nOptions;
};

export default {
  install: (app, options) => {
    provideI18n(options.i18n, app);
    const i18n = app.runWithContext(() => injectI18n());
    watchEffect(() =>
      globalThis.document.body.style.setProperty(
        "--onyx-global-optional-text",
        `"${i18n.t.value("optional")}"`,
      ),
    );
  },
} satisfies Plugin<OnyxPluginOptions>;
