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

export const useFiles = (store: ReplStore, onyxVersion: Ref<string>) => {
  Object.entries(FILES).forEach(([name, code]) => {
    store.addFile(new File(name, code, false));
  });

  store.template.newSFC = FILES["src/App.vue"];
  store.activeFilename = Object.keys(FILES)[0];
  store.mainFile = MAIN_FILE;

  watch(
    onyxVersion,
    () => {
      const code = PlaygroundMain.replace(
        "#STYLE_HREF#",
        `https://cdn.jsdelivr.net/npm/sit-onyx@${onyxVersion.value}/dist/style.css`,
      );

      const file = new File(MAIN_FILE, code, true);
      store.addFile(file);
      compileFile(store, file).catch((e) => (store.errors = [e]));
    },
    { immediate: true },
  );
};
