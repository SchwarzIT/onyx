/// <reference types="vitest" />
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { Options } from "sass-embedded";
import { defineConfig } from "vite";
import packageJson from "./package.json";
import { vuePluginOptions } from "./playwright.config";

type ViteScssOptions = Options<"async"> & { api: "modern-compiler" };

// https://vitejs.dev/config
export default defineConfig({
  plugins: [vue(vuePluginOptions)],
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
  test: {
    root: getFilePath("./"),
    environment: "jsdom",
    passWithNoTests: true,
    include: ["src/**/*.spec.(ts|tsx)"],
    coverage: {
      include: ["src"],
      exclude: ["src/**/*.stories.ts"],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        fatalDeprecations: ["mixed-decls"],
      } satisfies ViteScssOptions,
    },
  },
});

/** Gets the given path while ensuring cross-platform and correct decoding */
function getFilePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}
