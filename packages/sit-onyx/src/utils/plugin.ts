import { watchEffect, type Plugin } from "vue";
import {
  createGlobalFABProvider,
  GLOBAL_FAB_PROVIDER_INJECTION_KEY,
} from "../components/OnyxGlobalFAB/useGlobalFAB.js";
import {
  createNotificationsProvider,
  NOTIFICATIONS_PROVIDER_INJECTION_KEY,
} from "../components/OnyxNotifications/useNotification.js";
import {
  createToastProvider,
  TOAST_PROVIDER_INJECTION_KEY,
} from "../components/OnyxToast/useToast.js";
import { ROUTER_INJECTION_KEY, type ProvideRouterOptions } from "../composables/useLink.js";
import { injectI18n, provideI18n, type ProvideI18nOptions } from "../i18n/index.js";

export type OnyxPluginOptions = {
  /**
   * Integration for [Vue I18n](https://vue-i18n.intlify.dev/)
   */
  i18n?: ProvideI18nOptions;
  /**
   * Integration for [Vue Router](https://router.vuejs.org/).
   * @see https://onyx.schwarz/development/router.html
   */
  router?: ProvideRouterOptions;
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
    app.provide(GLOBAL_FAB_PROVIDER_INJECTION_KEY, createGlobalFABProvider());
    app.provide(NOTIFICATIONS_PROVIDER_INJECTION_KEY, createNotificationsProvider());

    if (options.router) app.provide(ROUTER_INJECTION_KEY, options.router);

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
  globalThis.document?.body.style.setProperty("--onyx-global-optional-text", `"${text}"`);
};
