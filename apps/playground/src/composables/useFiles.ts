import { File, compileFile, type ReplStore } from "@vue/repl";
import { watch, type Ref } from "vue";
import App from "../template/App.vue?raw";
import NewFile from "../template/NewFile.vue?raw";
import PlaygroundMain from "../template/PlaygroundMain.vue?raw";

/**
 * Main Playground file (will be hidden).
 * See "./template/PlaygroundMain.vue"
 */
const MAIN_FILE = "src/PlaygroundMain.vue" as const;

/**
 * Initial files to be visible in the playground.
 */
const FILES = {
  "src/App.vue": App,
} as const;

export type UseFilesOptions = {
  store: ReplStore;
  onyxVersion: Ref<string>;
  theme: Ref<"dark" | "light">;
  reloadPage: () => void;
  /**
   * Persisted / hashed state of the store.
   * If unset, default files will be initialized for the editor.
   */
  hash?: string;
};

/**
 * Composable for managing the Playground files.
 * Will insert the template files and sync the light/dark mode.
 */
export const useFiles = ({ store, onyxVersion, theme, reloadPage, hash }: UseFilesOptions) => {
  if (!hash) {
    Object.entries(FILES).forEach(([name, code]) => {
      store.addFile(new File(name, code, false));
    });
  }

  store.template.newSFC = NewFile;
  store.activeFilename = Object.keys(FILES)[0];
  store.mainFile = MAIN_FILE;

  /**
   * Import onyx stylesheet.
   */
  watch(
    [onyxVersion, theme],
    async () => {
      const code = PlaygroundMain.replace(
        "#STYLE_HREF#",
        `https://cdn.jsdelivr.net/npm/sit-onyx@${onyxVersion.value}/dist/style.css`,
      ).replace("#THEME#", theme.value);

      const file = new File(MAIN_FILE, code, true);
      store.addFile(file);
      await compileFile(store, file).catch((e) => (store.errors = [e]));
      reloadPage();
    },
    { immediate: true },
  );

  // prevent main playground file to be active/visible (e.g. because the current file is deleted)
  watch(
    () => store.activeFilename,
    (newActiveFile) => {
      if (newActiveFile !== MAIN_FILE) return;
      store.activeFilename = Object.keys(store.files).filter((i) => i !== MAIN_FILE)[0];
    },
    { immediate: true },
  );
};
