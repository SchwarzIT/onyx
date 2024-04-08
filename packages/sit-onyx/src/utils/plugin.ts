import { injectI18n, provideI18n, type ProvideI18nOptions } from "../i18n";
import { type Plugin, watchEffect } from "vue";

export type OnyxPluginOptions = {
  i18n?: ProvideI18nOptions;
};

/**
 * Use this plugin to set up onyx.
 * You can provide and overwrite default translations.
 */
export const createOnyx = (options: OnyxPluginOptions): Plugin<[]> => ({
  install: (app) => {
    provideI18n(app, options.i18n);
    const i18n = app.runWithContext(() => injectI18n());
    watchEffect(() => syncGlobalOptionalText(i18n.t.value("optional")));
  },
});

const syncGlobalOptionalText = (text: string) =>
  globalThis.document.body.style.setProperty("--onyx-global-optional-text", text);
