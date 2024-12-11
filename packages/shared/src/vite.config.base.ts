import vue from "@vitejs/plugin-vue";
import { deprecations, type Deprecation } from "sass-embedded";
import type { UserConfig } from "vite";

export const VITE_BASE_CONFIG = {
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // error for all warnings
        fatalDeprecations: (Object.values(deprecations) as Deprecation[]).filter(
          ({ status }) => status !== "future",
        ),
      },
    },
  },
} as const satisfies UserConfig;
