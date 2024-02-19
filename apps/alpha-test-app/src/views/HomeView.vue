<script lang="ts" setup>
import { provideI18n } from "sit-onyx";
import deDE from "sit-onyx/locales/de-DE.json";
import { useI18n } from "vue-i18n";
import HelloWorld from "../components/HelloWorld.vue";

const { t, locale } = useI18n();
provideI18n({ locale, messages: { "de-DE": deDE } });
</script>

<template>
  <div class="page">
    <div>
      <p>{{ t("message") }} in {{ locale }}</p>
      <button @click="locale = 'de-DE'">Deutsch</button>
      <button @click="locale = 'en-US'">English</button>
    </div>
    <HelloWorld />
  </div>
</template>

<style lang="scss" scoped></style>
