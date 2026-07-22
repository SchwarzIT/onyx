import { fileURLToPath, URL } from "node:url";
import { afterDiagnostic } from "@sit-onyx/shared/vite.config.base";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";
import { dependencies } from "./package.json" with { type: "json" };
import { skillMdPlugin } from "./skill-md.vite.js";

export default defineConfig({
  plugins: [skillMdPlugin(), dts({ afterDiagnostic })],
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

/**
 * Gets the given path while ensuring cross-platform and correct decoding
 */
function getFilePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}
