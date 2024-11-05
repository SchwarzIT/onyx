import vue, { type Api } from "@vitejs/plugin-vue";
import { deprecations, type Deprecation, type Options } from "sass-embedded";
import type { Plugin, UserConfig } from "vite";

type ViteScssOptions = Options<"async"> & { api: "modern-compiler" };

export const VITE_BASE_CONFIG = {
  plugins: [vue() as Plugin<Api>],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        // error for all warnings
        fatalDeprecations: (Object.values(deprecations) as Deprecation[]).filter(
          ({ status }) => status !== "future",
        ),
      } satisfies ViteScssOptions,
    },
  },
} as const satisfies UserConfig;
