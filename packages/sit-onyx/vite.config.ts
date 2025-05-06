/// <reference types="vitest" />
import { VITE_BASE_CONFIG } from "@sit-onyx/shared/vite.config.base";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import packageJson from "./package.json";
import { vuePluginOptions } from "./playwright.config";

// https://vitejs.dev/config
export default defineConfig({
  ...VITE_BASE_CONFIG,
  plugins: [
    vue(vuePluginOptions),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      compilerOptions: {
        composite: false,
      },
    }),
  ],
  build: {
    lib: {
      entry: getFilePath("./src/index.ts"),
      formats: ["es", "cjs"],
      fileName: "index",
      cssFileName: "style",
    },
    rollupOptions: {
      // make sure to externalize dependencies that shouldn't be bundled into the library
      external: Object.keys(packageJson.peerDependencies),
    },
  },
  experimental: {
    // see: https://vite.dev/guide/rolldown#enabling-native-plugins
    enableNativePlugin: true,
  },
  test: {
    root: getFilePath("./"),
    environment: "jsdom",
    passWithNoTests: true,
    include: ["src/**/*.spec.(ts|tsx)"],
    coverage: {
      include: ["src"],
      exclude: ["src/**/*.stories.ts"],
    },
    typecheck: {
      enabled: true,
      checker: "vue-tsc",
      ignoreSourceErrors: true,
      tsconfig: "tsconfig.app.json",
    },
    env: {
      TZ: "UTC",
    },
  },
});

/** Gets the given path while ensuring cross-platform and correct decoding */
function getFilePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}
