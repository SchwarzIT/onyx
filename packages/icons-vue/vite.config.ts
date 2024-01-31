import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ tsconfigPath: getFilePath("./tsconfig.build.json") })],
  build: {
    lib: {
      entry: getFilePath("./src/tmp/index.ts"),
      formats: ["es", "cjs"],
      fileName: "index",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: Object.keys(packageJson.peerDependencies),
    },
  },
});

/** Gets the given path while ensuring cross-platform and correct decoding */
function getFilePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}
