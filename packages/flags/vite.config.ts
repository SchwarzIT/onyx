import { VITE_BASE_CONFIG } from "@sit-onyx/shared/vite.config.base";
import svg from "@sit-onyx/vite-plugin-svg";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { DiagnosticCategory } from "typescript";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config
export default defineConfig({
  ...VITE_BASE_CONFIG,
  plugins: [
    vue(),
    svg({
      base: import.meta.url,
      input: "src/assets",
      modifyExportName: (name, rawName) => `flag${rawName.replaceAll("-", "_")}`,
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
  },
});

/** Gets the given path while ensuring cross-platform and correct decoding */
function getFilePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}
