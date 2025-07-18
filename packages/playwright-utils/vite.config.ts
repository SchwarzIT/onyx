import { VITE_BASE_CONFIG } from "@sit-onyx/shared/vite.config.base";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import packageJson from "./package.json";

const jsxImportSource = "playwright";

// https://vitejs.dev/config
export default defineConfig({
  ...VITE_BASE_CONFIG,
  plugins: [vue()],
  build: {
    lib: {
      entry: getFilePath("./src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      // make sure to externalize dependencies that shouldn't be bundled into the library
      external: [...Object.keys(packageJson.peerDependencies), `${jsxImportSource}/jsx-runtime`],
    },
  },
  esbuild: {
    jsx: "automatic",
    jsxImportSource,
  },
});

/** Gets the given path while ensuring cross-platform and correct decoding */
function getFilePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}
