import '@/styles/index.scss';
import '@scu/core-ui/dist/schwarz-core-ui/schwarz-core-ui.css';

import config from '@/config';
import { initializeI18n } from '@/i18n';
import { routes } from '@/router';
import { beforeMount } from '@playwright/experimental-ct-vue/hooks';
import { applyPolyfills, defineCustomElements } from '@scu/core-ui/dist/loader';
import {
  GlobalInfoTileInjectionKey,
  ToastControllerInjectionKey,
  type GlobalInfoTile,
  type Toast,
} from '@sit/vue-core';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

beforeMount(async ({ app }) => {
  await applyPolyfills();
  await defineCustomElements();

  const i18n = initializeI18n();
  const router = createRouter({ history: createWebHistory(config.app.baseUrl), routes });

  app.use(i18n).use(router).use(createPinia());

  // Provide global info tile so the tests are able to run
  app.provide(
    GlobalInfoTileInjectionKey,
    new Proxy({} as GlobalInfoTile, {
      // A Js Proxy that will log all calls
      get: (_, prop) => {
        return () => {
          // eslint-disable-next-line no-console
          console.log(`Called ${prop.toString()} on global info tile`);
        };
      },
    })
  );

  // Provide global toast so the tests are able to run
  app.provide(
    ToastControllerInjectionKey,
    new Proxy({} as Toast, {
      // A Js Proxy that will log all calls
      get: (_, prop) => {
        return () => {
          // eslint-disable-next-line no-console
          console.log(`Called ${prop.toString()} on global toast`);
        };
      },
    })
  );
});
