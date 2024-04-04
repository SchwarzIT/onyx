<script setup lang="ts">
import { Repl, mergeImportMap, useStore, useVueImportMap } from "@vue/repl";
import Monaco from "@vue/repl/monaco-editor";
import { OnyxAppLayout } from "sit-onyx";
import { computed, ref, watchEffect } from "vue";
import TheHeader from "./components/TheHeader.vue";
import { useDark } from "./composables/useDark";
import { useFiles } from "./composables/useFiles";
import { fetchVersions } from "./utils/versions";

const { vueVersion, importMap } = useVueImportMap({ vueVersion: "latest" });

/**
 * Currently selected onyx version.
 */
const onyxVersion = ref("alpha");

/**
 * List of available onyx versions.
 */
const onyxVersions = ref<string[]>([]);
fetchVersions("sit-onyx").then((versions) => (onyxVersions.value = versions));

const hash = location.hash.slice(1);

const store = useStore(
  {
    vueVersion,
    typescriptVersion: ref("latest"),
    builtinImportMap: computed(() =>
      mergeImportMap(importMap.value, {
        imports: {
          "sit-onyx": `https://cdn.jsdelivr.net/npm/sit-onyx@${onyxVersion.value}/dist/index.js`,
        },
      }),
    ),
    /**
     * Specify onyx version which is needed for the Monaco editor so that is loads the correct types for the current version
     */
    dependencyVersion: computed(() => {
      const version =
        onyxVersion.value === "alpha"
          ? onyxVersions.value.find((i) => i.includes("-alpha")) ?? onyxVersion.value
          : onyxVersion.value;

      return { "sit-onyx": version };
    }),
  },
  // initialize repl with previously serialized state
  hash,
);

// persist state in URL
watchEffect(() => history.replaceState({}, "", store.serialize()));

const replRef = ref<InstanceType<typeof Repl>>();
const reloadPage = () => replRef.value?.reload();

const { isDark, theme } = useDark();

useFiles({ store, onyxVersion, theme, reloadPage, hash });
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

    <Repl
      ref="replRef"
      :editor="Monaco"
      :theme="theme"
      :store="store"
      :clear-console="false"
      :show-compile-output="false"
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
  --border: var(--onyx-color-base-neutral-300);

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
