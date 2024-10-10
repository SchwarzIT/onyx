import vue from "@vitejs/plugin-vue";
import { deprecations, type Deprecation, type Options } from "sass-embedded";
import type { UserConfig } from "vite";

type ViteScssOptions = Options<"async"> & { api: "modern-compiler" };

export const VITE_BASE_CONFIG = {
  plugins: [vue()],
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
} satisfies UserConfig;
