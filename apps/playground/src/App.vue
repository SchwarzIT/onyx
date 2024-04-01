<script setup lang="ts">
import { Repl, mergeImportMap, useStore, useVueImportMap } from "@vue/repl";
import Monaco from "@vue/repl/monaco-editor";
import { OnyxAppLayout } from "sit-onyx";
import { computed, onMounted, ref, watchEffect } from "vue";
import TheHeader from "./components/TheHeader.vue";
import { useFiles } from "./composables/useFiles";

const { vueVersion, importMap } = useVueImportMap({ vueVersion: "latest" });
const onyxVersion = ref("alpha");

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
  },
  // initialize repl with previously serialized state
  location.hash.slice(1),
);

useFiles(store, onyxVersion);

// persist state
watchEffect(() => history.replaceState({}, "", `#${store.serialize()}`));

const replRef = ref<InstanceType<typeof Repl>>();
const reloadPage = () => replRef.value?.reload();

const theme = ref<"dark" | "light">("dark");

const updateTheme = (isDark: boolean) => {
  theme.value = isDark ? "dark" : "light";

  const classList = document.documentElement.classList;
  if (isDark) classList.add("dark");
  else classList.remove("dark");

  localStorage.setItem("vue-sfc-playground-prefer-dark", String(isDark));
};

onMounted(() => {
  const isDark =
    localStorage.getItem("vue-sfc-playground-prefer-dark") === "true" ||
    document.documentElement.classList.contains("dark");
  updateTheme(isDark);
});
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <TheHeader
        v-model:onyx-version="onyxVersion"
        :store="store"
        :dark="theme === 'dark'"
        @update:dark="updateTheme"
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
}
</style>
