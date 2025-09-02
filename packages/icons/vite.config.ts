import { VITE_BASE_CONFIG } from "@sit-onyx/shared/vite.config.base";
import svg from "@sit-onyx/vite-plugin-svg";
import { fileURLToPath, URL } from "node:url";
import { DiagnosticCategory } from "typescript";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { getIconImportName } from "./src/utils.js";

// https://vitejs.dev/config
export default defineConfig({
  ...VITE_BASE_CONFIG,
  plugins: [
    svg({
      base: import.meta.url,
      input: "src/assets",
      modifyExportName: (name) => getIconImportName(name),
    }),
    dts({
      afterDiagnostic: async (diagnostics) => {
        if (diagnostics.some((d) => d.category === DiagnosticCategory.Error)) {
          throw new Error("Build aborted due to TypeScript errors in the library!");
        }
      },
    }),
    viteStaticCopy({
      targets: [{ src: "src/assets", dest: "" }],
    }),
  ],
  build: {
    lib: {
      entry: [getFilePath("./src/index.ts"), getFilePath("./src/utils.ts")],
      formats: ["es"],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    // using terser instead of esbuild because it has export name conflicts when used inside Nuxt
    // because inside utils.js, a variable is named "h" which conflicts with the Nuxt auto import from "vue"
    minify: "terser",
  },
});

/** Gets the given path while ensuring cross-platform and correct decoding */
function getFilePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}
