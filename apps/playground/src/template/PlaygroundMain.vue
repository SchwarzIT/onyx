<script lang="ts" setup>
import App from "./App.vue";

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "#STYLE_HREF#";
document.body.append(link);
</script>

<template>
  <App />
</template>

<style>
@import "./style.css";
</style>
