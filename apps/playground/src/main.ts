import { createApp } from "vue";
import App from "./App.vue";

import "sit-onyx/globals.css";
import "sit-onyx/style.css";

// set default select app for the Vue devtools to the inner user app, not the parent application/playground
(window as Window & { VUE_DEVTOOLS_CONFIG?: unknown }).VUE_DEVTOOLS_CONFIG = {
  defaultSelectedAppId: "repl",
};

createApp(App).mount("#app");
