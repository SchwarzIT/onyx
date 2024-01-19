<script setup lang="ts">
import { provideI18n } from "sit-onyx";
import deDE from "sit-onyx/locales/de-DE.json";
import { useI18n } from "vue-i18n";
import HelloWorld from "./components/HelloWorld.vue";

const { locale } = useI18n();
provideI18n({ locale, messages: { "de-DE": deDE } });
</script>

<template>
  <div>
    {{ locale }}
    <button @click="locale = 'de-DE'">Deutsch</button>
    <button @click="locale = 'en-US'">English</button>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
