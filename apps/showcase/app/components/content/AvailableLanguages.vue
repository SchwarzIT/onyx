<script lang="ts" setup>
import { iconCircleHelp } from "@sit-onyx/icons";

const defaultLocale = "en-US";

const locales = import.meta.glob("../../../node_modules/sit-onyx/dist/i18n/locales/*.json");
const codes = Object.keys(locales)
  .map((code) => code.split("/").at(-1)!.replace(".json", ""))
  .filter((code) => code !== defaultLocale);
</script>

<template>
  <div class="languages">
    <div class="onyx-grid">
      <LanguageCard :code="defaultLocale" class="onyx-grid-span-4" />
    </div>

    <OnyxSeparator />

    <div class="onyx-grid">
      <LanguageCard v-for="code in codes" :key="code" class="onyx-grid-span-4" :code />

      <OnyxCard class="onyx-grid-span-4 request">
        <OnyxIcon :icon="iconCircleHelp" />
        <OnyxHeadline is="h3">{{ $t("i18n.languageMissing") }}</OnyxHeadline>

        <OnyxLink
          href="https://github.com/SchwarzIT/onyx/discussions/categories/ideas"
          target="_blank"
        >
          {{ $t("createFeatureRequest") }}
        </OnyxLink>
      </OnyxCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.languages {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-grid-gutter);
}

.request {
  align-items: center;
}
</style>
