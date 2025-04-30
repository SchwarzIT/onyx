<script setup lang="ts">
import { Repl } from "@vue/repl";
import Monaco from "@vue/repl/monaco-editor";
import { useDark } from "@vueuse/core";
import { OnyxAppLayout } from "sit-onyx";
import { computed, useTemplateRef, type ComponentInstance } from "vue";
import TheHeader from "./components/TheHeader.vue";
import { useStore } from "./composables/useStore";

const { store, onyxVersion, isLoadingOnyxVersions } = useStore();

const replRef = useTemplateRef("replRef");
const reloadPage = () => {
  replRef.value?.reload();
  store.reloadLanguageTools?.();
};

const isDark = useDark();
const theme = computed(() => (isDark.value ? "dark" : "light"));

const previewOptions = computed<ComponentInstance<typeof Repl>["previewOptions"]>(() => {
  return {
    headHTML: `<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/sit-onyx@${onyxVersion.value}/dist/style.css' />
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/sit-onyx@${onyxVersion.value}/src/styles/global.css' />
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/@fontsource-variable/source-sans-3/index.css' />
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/@fontsource-variable/source-code-pro/index.css' />
    `,
  };
});
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <TheHeader
        v-model:onyx-version="onyxVersion"
        v-model:vue-version="store.vueVersion"
        v-model:typescript-version="store.typescriptVersion"
        v-model:dark="isDark"
        @reload-page="reloadPage"
      />
    </template>

    <!-- the key is needed here to update the headHTML below correctly so
    the correct style.css for the onyx version is loaded -->
    <Repl
      v-if="!isLoadingOnyxVersions"
      ref="replRef"
      :editor="Monaco"
      :theme="theme"
      :store="store"
      :clear-console="false"
      :show-compile-output="false"
      :preview-options="previewOptions"
      preview-theme
      auto-resize
      @keydown.ctrl.s.prevent
      @keydown.meta.s.prevent
    />
  </OnyxAppLayout>
</template>

<style lang="scss">
.dark .vue-repl,
.vue-repl {
  --color-branding: var(--onyx-color-text-icons-primary-intense);
  --color-branding-dark: var(--onyx-color-text-icons-primary-bold);

  --bg: var(--onyx-color-base-background-blank);
  --bg-soft: var(--onyx-color-base-background-tinted);
  --border: var(--onyx-color-component-border-neutral);

  font-family: var(--onyx-font-family);
  --font-code: var(--onyx-font-family-mono);
  --text-light: var(--onyx-color-text-icons-neutral-medium);

  .import-map-wrapper {
    background: none;
  }

  .monaco-editor {
    --vscode-editor-background: var(--onyx-color-base-background-blank);
    --vscode-editorGutter-background: var(--onyx-color-base-background-blank);
  }
}
</style>
