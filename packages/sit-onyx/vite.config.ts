/// <reference types="vitest" />
import { VITE_BASE_CONFIG } from "@sit-onyx/shared/vite.config.base";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { DiagnosticCategory } from "typescript";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import packageJson from "./package.json";
import { vuePluginOptions } from "./playwright.config.js";

// https://vitejs.dev/config
export default defineConfig({
  ...VITE_BASE_CONFIG,
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.app.json",
      compilerOptions: { composite: false },
      afterDiagnostic: async (diagnostics) => {
        if (diagnostics.some((d) => d.category === DiagnosticCategory.Error)) {
          throw new Error("Build aborted due to TypeScript errors in the library!");
        }
      },
    }),
    vue(vuePluginOptions),
  ],
  build: {
    lib: {
      entry: getFilePath("./src/index.ts"),
      formats: ["es"],
      fileName: "index",
      cssFileName: "style",
    },
    rollupOptions: {
      // make sure to externalize dependencies that shouldn't be bundled into the library
      external: Object.keys(packageJson.peerDependencies),
    },
  },
  test: {
    root: getFilePath("./"),
    environment: "jsdom",
    passWithNoTests: true,
    include: ["src/**/*.spec.(ts|tsx)"],
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
