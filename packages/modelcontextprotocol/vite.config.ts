import { fileURLToPath, URL } from "node:url";
import { DiagnosticCategory } from "typescript";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";
import packageJson from "./package.json" with { type: "json" };
import { skillMdPlugin } from "./skill-md.vite.js";

export default defineConfig({
  plugins: [
    skillMdPlugin(),
    dts({
      afterDiagnostic: (diagnostics) => {
        if (diagnostics.some((d) => d.category === DiagnosticCategory.Error)) {
          throw new Error("Build aborted due to TypeScript errors in the library!");
        }
      },
    }),
  ],
  ssr: {
    noExternal: true,
    external: Object.keys(packageJson.dependencies),
    target: "node",
  },
  build: {
    target: [getBuildTarget()],
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

/**
 * Gets the build target based on the supported node version definition.
 */
function getBuildTarget() {
  return `node${packageJson.engines.node.replace(/[^0-9.]/g, "")}`;
}
