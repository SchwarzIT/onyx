<script lang="ts" setup>
import type { SelectOption } from "sit-onyx";

const { locale, setLocale, locales } = useI18n();

const localeOptions = computed(() => {
  return locales.value.map<SelectOption>((locale) => ({
    label: locale.name ?? locale.code,
    value: locale.code,
  }));
});
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <NavBar />
    </template>

    <div class="onyx-grid-container">
      <OnyxSelect
        class="language-select"
        :model-value="locale"
        label="Select locale"
        list-label="List of available locales"
        :options="localeOptions"
        @update:model-value="setLocale($event as string)"
      />

      <div>Translation from project: {{ $t("test") }}</div>
      <div>Translation from onyx module: {{ $t("onyx.optional") }}</div>
      <div>
        Translation from onyx module overwritten by project: {{ $t("onyx.navigation.goBack") }}
      </div>

      <OnyxLink href="https://www.lidl.de" target="_blank">Link to external</OnyxLink>
    </div>
  </OnyxAppLayout>
</template>

<style scoped>
.language-select {
  max-width: 24rem;
}
</style>
