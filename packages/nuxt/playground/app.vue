<script lang="ts" setup>
const { locale, setLocale } = useI18n();
</script>

<template>
  <div class="app">
    <OnyxHeadline is="h1">Nuxt module playground!</OnyxHeadline>

    <div class="language-switch">
      English
      <OnyxSwitch
        label="Deutsch"
        hide-label
        :model-value="locale === 'de-DE'"
        @update:model-value="$event ? setLocale('de-DE') : setLocale('en-US')"
      />
      Deutsch
    </div>

    <div>Translation from project: {{ $t("test") }}</div>
    <div>Translation from onyx module: {{ $t("onyx.optional") }}</div>
    <div>
      Translation from onyx module overwritten by project: {{ $t("onyx.navigation.goBack") }}
    </div>

    <OnyxLink href="https://www.lidl.de" target="_blank">Link to external</OnyxLink>
  </div>
</template>

<style scoped>
.app {
  margin: 1rem;
}

.language-switch {
  display: inline-flex;
  align-items: center;
}
</style>
