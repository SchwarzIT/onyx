<script lang="ts" setup>
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

<style>
@import "./style.css";
</style>
