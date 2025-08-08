<script lang="ts" setup>
import { iconTranslate } from "@sit-onyx/icons";
import type { SelectDialogOption } from "sit-onyx";

const { locale, setLocale, locales } = useI18n();
const isLanguageDialogOpen = ref(false);

const languageOptions = computed(() => {
  return locales.value.map((locale) => {
    return {
      label: locale.name ?? locale.code,
      value: locale.code,
    } satisfies SelectDialogOption;
  });
});

const currentLocaleLabel = computed(() => {
  // using "!" here is safe since splitting a string will always return at least one string in the returned array
  return locale.value.split("-")[0]!.split("_")[0]!.toUpperCase();
});
</script>

<template>
  <OnyxButton
    :label="currentLocaleLabel"
    :icon="iconTranslate"
    color="neutral"
    mode="plain"
    @click="isLanguageDialogOpen = true"
  />

  <OnyxSelectDialog
    v-model:open="isLanguageDialogOpen"
    :label="$t('onyx.languageSelect.headline')"
    :model-value="locale"
    :options="languageOptions"
    @update:model-value="setLocale($event)"
  >
    <template #description> {{ $t("onyx.languageSelect.subtitle") }} </template>
  </OnyxSelectDialog>
</template>
