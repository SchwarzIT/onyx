import App from '@/App.vue';
import config from '@/config';
import { changeLocale, getUserPreferredLocale, initializeI18n } from '@/i18n';
import { routes } from '@/router';
import { useAuthStore } from '@/stores/authStore';
import { applyPolyfills, defineCustomElements } from '@scu/core-ui/dist/loader';
import { createAuthorizationGuard, createOAuthLoginGuard, defaultScrollBehavior } from '@sit/vue-core';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import '@scu/core-ui/dist/schwarz-core-ui/schwarz-core-ui.css';
import '@sit/vue-core/style.css';
import 'sit-onyx/style.css';

/**
 * Setup up vue app. This function should not be called twice. Its exported only for testing.
 */
export async function setupApp() {
  // Initializing CoreUI
  await applyPolyfills();
  await defineCustomElements();

  const i18n = initializeI18n();
  const locale = getUserPreferredLocale();
  if (locale) await changeLocale(locale, false);

  const router = createRouter({
    history: createWebHistory(config.app.baseUrl),
    scrollBehavior: defaultScrollBehavior,
    routes,
  });

  const app = createApp(App).use(i18n).use(createPinia());

  const authStore = useAuthStore();
  if (!config.auth.disabled) {
    router.beforeEach(createOAuthLoginGuard({ authStore }));
    router.beforeEach(createAuthorizationGuard({ authStore }));
  }
  // register the router after the before each. -> bug on gcp beforeEach don't get executed onload
  app.use(router);
  await router.isReady();

  app.mount('#app');
  return app;
}
setupApp();
