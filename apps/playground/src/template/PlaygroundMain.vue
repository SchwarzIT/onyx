<script lang="ts" setup>
/**
 * This file is the internal wrapper / main file of the Playground.
 * We use it to initialize onyx (e.g. import onyx styles) and sync the light/dark mode.
 * The content of this file will be replaced in `composables/useFiles.ts`, therefore
 * we can use placeholder strings to dynamically insert data from the parent application.
 */
import App from "./App.vue";

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "#STYLE_HREF#";
document.body.append(link);

const theme: string = "#THEME#";

if (theme === "dark") {
  document.documentElement.classList.add("dark");
  document.documentElement.classList.remove("light");
} else {
  document.documentElement.classList.add("light");
  document.documentElement.classList.remove("dark");
}
</script>

<template>
  <App />
</template>
