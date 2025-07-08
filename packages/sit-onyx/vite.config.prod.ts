/// <reference types="vitest" />
import vue from "@vitejs/plugin-vue";
import { defineConfig, mergeConfig, type UserConfig } from "vite";
import { vuePluginOptions } from "./playwright.config.js";
import type { DeepPartial } from "./src/index.js";
import bundlerConfig from "./vite.config.js";

type ViteMergeConfig = DeepPartial<UserConfig>;

// https://vitejs.dev/config
export default defineConfig({
  ...mergeConfig(
    bundlerConfig,
    {
      build: {
        sourcemap: false,
        minify: "esbuild",
        lib: {
          fileName: "index",
        },
      },
      define: { "process.env.NODE_ENV": '"production"' }, // statically replace all "process.env.NODE_ENV" calls
    } satisfies ViteMergeConfig,
    true,
  ),
  mode: undefined,
  plugins: [vue(vuePluginOptions)],
});
