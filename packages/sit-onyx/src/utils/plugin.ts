import { injectI18n, provideI18n, type ProvideI18nOptions } from "@/i18n";
import { type Plugin, watchEffect } from "vue";

export type OnyxPluginOptions = {
  i18n?: ProvideI18nOptions;
};

export const createOnyx = (options: OnyxPluginOptions): Plugin<[]> => ({
  install: (app) => {
    provideI18n(options.i18n, app);
    const i18n = app.runWithContext(() => injectI18n());
    watchEffect(() => syncGlobalOptionalText(i18n.t.value("optional")));
  },
});

const syncGlobalOptionalText = (text: string) =>
  globalThis.document.body.style.setProperty("--onyx-global-optional-text", text);
