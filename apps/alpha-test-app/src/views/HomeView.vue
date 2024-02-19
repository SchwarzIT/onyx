<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import HelloWorld from "../components/HelloWorld.vue";

const { t, locale } = useI18n();
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
