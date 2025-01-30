<script lang="ts" setup>
import type { SelectOption } from "sit-onyx";

const { locale, setLocale, locales } = useI18n();
const localePath = useLocalePath();

const localeOptions = computed(() => {
  return locales.value.map((locale) => {
    return {
      label: locale.name ?? locale.code,
      value: locale.code,
    } satisfies SelectOption;
  });
});
</script>

<template>
  <div>
    <OnyxSelect
      class="language-select"
      :model-value="locale"
      label="Select locale"
      list-label="List of available locales"
      :options="localeOptions"
      @update:model-value="setLocale"
    />

    <div>Translation from project: {{ $t("test") }}</div>
    <div>Translation from onyx module: {{ $t("onyx.optional") }}</div>
    <div>
      Translation from onyx module overwritten by project: {{ $t("onyx.navigation.goBack") }}
    </div>

    <OnyxLink href="https://www.lidl.de" target="_blank">Link to external</OnyxLink>
    <OnyxLink :href="localePath('/test')">Link to internal</OnyxLink>
  </div>
</template>

<style scoped>
.language-select {
  max-width: 24rem;
}
</style>
