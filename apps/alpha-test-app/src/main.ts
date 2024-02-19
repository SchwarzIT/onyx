import "sit-onyx/style.css";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import deDE from "./i18n/locales/de-DE.json";
import enUS from "./i18n/locales/en-US.json";
import { routes } from "./router";
import "./style.css";

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

  const app = createApp(App).use(i18n).use(router);
  await router.isReady();

  app.mount("#app");
}

setupApp();
