import { VITE_BASE_CONFIG } from "@sit-onyx/shared/vite.config.base";
import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
  ...VITE_BASE_CONFIG,
  optimizeDeps: {
    // needed in order for the web workers of "@vue/repl" to work
    exclude: ["@vue/repl"],
  },
});
