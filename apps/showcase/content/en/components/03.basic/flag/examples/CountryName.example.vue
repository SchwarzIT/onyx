<script lang="ts" setup>
import { flagDE } from "@sit-onyx/flags";
import { OnyxIcon } from "sit-onyx";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const countryNames = computed(() => new Intl.DisplayNames(locale.value, { type: "region" }));
</script>

<template>
  <OnyxIcon :icon="flagDE" />
  <span>{{ countryNames.of("DE") }}</span>
</template>
