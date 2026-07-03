import { fileURLToPath, URL } from "node:url";
import { DiagnosticCategory } from "typescript";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";
import { dependencies } from "./package.json" with { type: "json" };
import { skillMdPlugin } from "./skill-md.vite.js";

export default defineConfig({
  plugins: [
    skillMdPlugin(),
    dts({
      afterDiagnostic: async (diagnostics) => {
        if (diagnostics.some((d) => d.category === DiagnosticCategory.Error)) {
          throw new Error("Build aborted due to TypeScript errors in the library!");
        }
      },
    }),
  ],
  ssr: {
    noExternal: true,
    external: Object.keys(dependencies),
    target: "node",
  },
  build: {
    target: ["node24"],
    lib: {
      entry: getFilePath("./src/index.ts"),
      formats: ["es"],
      fileName: (_, entryName) => `${entryName}.js`,
    },
  },
});

/** Gets the given path while ensuring cross-platform and correct decoding */
function getFilePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}
