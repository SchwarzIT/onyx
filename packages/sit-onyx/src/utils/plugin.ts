import { type Plugin, watchEffect } from "vue";
import {
  createToastProvider,
  TOAST_PROVIDER_INJECTION_KEY,
} from "../components/OnyxToast/useToast";
import { injectI18n, provideI18n, type ProvideI18nOptions } from "../i18n";

export type OnyxPluginOptions = {
  i18n?: ProvideI18nOptions;
};

/**
 * Use this plugin to set up onyx.
 * You can provide and overwrite default translations.
 */
export const createOnyx = (options: OnyxPluginOptions = {}): Plugin => ({
  install: (app) => {
    provideI18n(app, options.i18n);
    const i18n = app.runWithContext(() => injectI18n());
    app.provide(TOAST_PROVIDER_INJECTION_KEY, createToastProvider());

    app.mixin({
      beforeMount: () => {
        // we must ensure to only call `syncGlobalOptionalText` before/on mounted
        // to support server side rendering since it modifies the document.body
        watchEffect(() => {
          syncGlobalOptionalText(i18n.t.value("optional"));
        });
      },
    });
  },
});

const syncGlobalOptionalText = (text: string) => {
  globalThis.document.body.style.setProperty("--onyx-global-optional-text", text);
};
