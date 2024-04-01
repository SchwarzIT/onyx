import { createApp } from "vue";
import App from "./App.vue";

import "sit-onyx/style.css";
import "./styles/index.scss";

// @ts-expect-error Custom window property
window.VUE_DEVTOOLS_CONFIG = {
  defaultSelectedAppId: "repl",
};

createApp(App).mount("#app");
