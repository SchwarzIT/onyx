import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { VITE_BASE_CONFIG } from "./node_modules/@sit-onyx/shared/vite.config.base";

// https://vitejs.dev/config
export default defineConfig({
  ...VITE_BASE_CONFIG,
  plugins: [],
  resolve: {
    alias: {
      "~components": getFilePath("../../packages/sit-onyx/src/components"),
    },
  },
});

/** Gets the given path while ensuring cross-platform and correct decoding */
function getFilePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}
