/// <reference types="vitest" />
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import packageJson from "../components/package.json";
import { vuePluginOptions } from "../components/playwright.config";

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    vue(vuePluginOptions),
    viteStaticCopy({
      targets: [
        {
          src: "./node_modules/@sit-onyx/components/src/i18n/locales/*",
          dest: "locales",
        },
        {
          src: ["./node_modules/@sit-onyx/components/src/styles/**"],
          dest: "styles",
        },
      ],
    }),
  ],
  build: {
    lib: {
      entry: getFilePath("./src/index.ts"),
      formats: ["es", "cjs"],
      fileName: "index",
    },
    rollupOptions: {
      // make sure to externalize dependencies that shouldn't be bundled into the library
      external: Object.keys(packageJson.peerDependencies),
    },
  },
});

/** Gets the given path while ensuring cross-platform and correct decoding */
function getFilePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}
