import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vite.dev/config/
export default defineConfig({
  root: "ui",
  plugins: [
    vue(),
    // Figma Plugins expect the whole UI to be in a single file so we use a Vite plugin to achieve this
    viteSingleFile(),
  ],
  build: {
    outDir: "../dist/ui",
  },
});
