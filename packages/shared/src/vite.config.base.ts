import vue from "@vitejs/plugin-vue";
import { Features } from "lightningcss";
import { deprecations, type Deprecation } from "sass-embedded";
import { type Diagnostic, DiagnosticCategory } from "typescript/unstable/sync";
import type { UserConfig } from "vite";

export const VITE_BASE_CONFIG: UserConfig = {
  plugins: [vue()],
  css: {
    lightningcss: {
      // see: https://github.com/parcel-bundler/lightningcss/issues/873
      exclude: Features.LightDark,
    },
    preprocessorOptions: {
      scss: {
        // error for all warnings
        fatalDeprecations: (Object.values(deprecations) as Deprecation[]).filter(
          ({ status }) => status !== "future" && status !== "obsolete",
        ),
      },
    },
  },
  /**
   * ⚠️ Global test config should be defined in the root "vitest.config.ts, instead of here!" ⚠️
   */
};

/**
 * "afterDiagnostic" hook for vite dts plugin to break the build if TypeScript errors exist.
 */
export const afterDiagnostic = async (diagnostics: readonly Diagnostic[]) => {
  if (diagnostics.some((d) => d.category === DiagnosticCategory.Error)) {
    throw new Error("Build aborted due to TypeScript errors in the library!");
  }
};
