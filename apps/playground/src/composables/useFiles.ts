import { File, compileFile, type ReplStore } from "@vue/repl";
import { watch, type Ref } from "vue";
import App from "../template/App.vue?raw";
import PlaygroundMain from "../template/PlaygroundMain.vue?raw";
import style from "../template/style.css?raw";

const MAIN_FILE = "PlaygroundMain.vue" as const;

const FILES = {
  "src/App.vue": App,
  "src/style.css": style,
} as const;

export type UseFilesOptions = {
  store: ReplStore;
  onyxVersion: Ref<string>;
  theme: Ref<"dark" | "light">;
  reloadPage: () => void;
};

export const useFiles = ({ store, onyxVersion, theme, reloadPage }: UseFilesOptions) => {
  Object.entries(FILES).forEach(([name, code]) => {
    store.addFile(new File(name, code, false));
  });

  store.template.newSFC = FILES["src/App.vue"];
  store.activeFilename = Object.keys(FILES)[0];
  store.mainFile = MAIN_FILE;

  watch(
    [onyxVersion, theme],
    () => {
      const code = PlaygroundMain.replace(
        "#STYLE_HREF#",
        `https://cdn.jsdelivr.net/npm/sit-onyx@${onyxVersion.value}/dist/style.css`,
      ).replace("#THEME#", theme.value);

      const file = new File(MAIN_FILE, code, true);
      store.addFile(file);
      compileFile(store, file).catch((e) => (store.errors = [e]));
      reloadPage();
    },
    { immediate: true },
  );
};
