<script setup lang="ts">
import { Repl, useStore } from "@vue/repl";
import Monaco from "@vue/repl/monaco-editor";
import { onMounted, ref, watchEffect } from "vue";
import TheHeader from "./components/TheHeader.vue";

const store = useStore({
  vueVersion: ref("latest"),
  typescriptVersion: ref("latest"),
});

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
  <TheHeader
    :store="store"
    :dark="theme === 'dark'"
    @update:dark="updateTheme"
    @reload-page="reloadPage"
  />
  <Repl
    ref="replRef"
    :editor="Monaco"
    :theme="theme"
    :store="store"
    :clear-console="false"
    :show-compile-output="false"
    :show-import-map="false"
    auto-resize
    @keydown.ctrl.s.prevent
    @keydown.meta.s.prevent
  />
</template>

<style>
.dark {
  color-scheme: dark;
}

body {
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0;
  --base: #444;
  --nav-height: 50px;
}

.vue-repl {
  height: calc(100vh - var(--nav-height));
}

button {
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  background-color: transparent;
}
</style>
