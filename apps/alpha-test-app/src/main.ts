import "sit-onyx/style.css";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import enUS from "./i18n/locales/en-US.json";
import deDE from "./i18n/locales/de-DE.json";
import onyxDeDE from "sit-onyx/locales/de-DE.json";
import { onyx } from "sit-onyx";

const i18n = createI18n({
  legacy: false,
  locale: "en-US",
  messages: { "en-US": enUS, "de-DE": deDE },
});

createApp(App)
  .use(i18n)
  .use(onyx, { i18n: { locale: i18n.global.locale, messages: { "de-DE": onyxDeDE } } })
  .mount("#app");
