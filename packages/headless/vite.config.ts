import { VITE_BASE_CONFIG } from "@sit-onyx/shared/vite.config.base";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { DiagnosticCategory } from "typescript";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import packageJson from "./package.json";

// https://vitejs.dev/config
export default defineConfig({
  ...VITE_BASE_CONFIG,
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.json",
      beforeWriteFile: (filePath) => {
        if (filePath.endsWith(".vue.d.ts")) {
          return { filePath: filePath.replace(".vue.d.ts", ".d.vue.ts") };
        }
      },
      afterDiagnostic: async (diagnostics) => {
        if (diagnostics.some((d) => d.category === DiagnosticCategory.Error)) {
          throw new Error("Build aborted due to TypeScript errors in the library!");
        }
      },
    }),
    vue(),
  ],
  build: {
    minify: false,
    lib: {
      entry: [getFilePath("./src/index.ts"), getFilePath("./src/playwright.ts")],
      formats: ["es"],
    },
    rollupOptions: {
      // make sure to externalize dependencies that shouldn't be bundled into the library
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
  esbuild: {
    jsx: "automatic",
  },
});

/** Gets the given path while ensuring cross-platform and correct decoding */
function getFilePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}
