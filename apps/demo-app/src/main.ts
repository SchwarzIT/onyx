import { createPinia } from "pinia";
import { createOnyx } from "sit-onyx";
import onyxDeDE from "sit-onyx/locales/de-DE.json";
import onyxKoKR from "sit-onyx/locales/ko-KR.json";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import deDE from "./i18n/locales/de-DE.json";
import enUS from "./i18n/locales/en-US.json";
import { routes } from "./router/index.js";

import "@fontsource-variable/source-code-pro";
import "@fontsource-variable/source-sans-3";
import "sit-onyx/global.css";
import "sit-onyx/style.css";

async function setupApp() {
  const i18n = createI18n({
    legacy: false,
    locale: "en-US",
    messages: { "en-US": enUS, "de-DE": deDE },
  });

  const router = createRouter({
    history: createWebHistory("/"),
    scrollBehavior: (_, __, savedPosition) => {
      return savedPosition ?? { top: 0 };
    },
    routes,
  });

  const onyx = createOnyx({
    i18n: {
      locale: i18n.global.locale,
      messages: { "de-DE": onyxDeDE, "ko-KR": onyxKoKR },
    },
    router,
  });

  const app = createApp(App).use(i18n).use(router).use(onyx).use(createPinia());
  await router.isReady();

  app.mount("#app");
}

setupApp();
