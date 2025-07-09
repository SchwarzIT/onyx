import { VITE_BASE_CONFIG } from "@sit-onyx/shared/vite.config.base";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import packageJson from "./package.json";

// https://vitejs.dev/config
export default defineConfig({
  ...VITE_BASE_CONFIG,
  build: {
    write: false,
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      // make sure to externalize dependencies that shouldn't be bundled into the library
      external: Object.keys(packageJson.peerDependencies),
    },
  },
});
