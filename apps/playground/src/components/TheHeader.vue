<script setup lang="ts">
import moon from "@sit-onyx/icons/moon.svg?raw";
import shareAndroid from "@sit-onyx/icons/share-android.svg?raw";
import sunny from "@sit-onyx/icons/sunny.svg?raw";
import sync from "@sit-onyx/icons/sync.svg?raw";
import githubLogo from "../assets/github-logo.svg?raw";
import HeaderIconButton from "./HeaderIconButton.vue";
import VersionSelect from "./VersionSelect.vue";

const emit = defineEmits<{
  reloadPage: [];
}>();

const isDark = defineModel<boolean>("dark");
const vueVersion = defineModel<string | null>("vueVersion");
const typescriptVersion = defineModel<string>("typescriptVersion");
const onyxVersion = defineModel<string>("onyxVersion");

const copyLink = async () => {
  await navigator.clipboard.writeText(location.href);
  alert("Sharable URL has been copied to clipboard.");
};
</script>

<template>
  <header class="header">
    <a class="header__brand" href="https://onyx.schwarz" target="_blank">
      <img alt="logo" src="/logo.svg" class="header__logo" />
      <h1 class="onyx-headline onyx-headline--h2">Playground</h1>
    </a>

    <div class="header__actions">
      <VersionSelect
        v-model="onyxVersion"
        pkg="sit-onyx"
        label="onyx version"
        include-pre-releases
      />

      <VersionSelect v-model="vueVersion" pkg="vue" label="Vue version" />

      <VersionSelect v-model="typescriptVersion" pkg="typescript" label="TypeScript version" />

      <HeaderIconButton
        label="Toggle dark mode"
        :icon="isDark ? moon : sunny"
        @click="isDark = !isDark"
      />

      <HeaderIconButton
        label="Copy sharable URL"
        :icon="shareAndroid"
        variation="secondary"
        @click="copyLink"
      />

      <HeaderIconButton
        label="Reload page"
        :icon="sync"
        variation="secondary"
        @click="emit('reloadPage')"
      />

      <a
        href="https://github.com/SchwarzIt/onyx/tree/main/apps/playground"
        target="_blank"
        aria-label="View on GitHub"
      >
        <HeaderIconButton label="View on GitHub" :icon="githubLogo" variation="secondary" />
      </a>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  padding: var(--onyx-spacing-2xs) var(--onyx-spacing-md);
  width: 100%;
  border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-200);

  display: flex;
  align-items: center;
  justify-content: space-between;

  &__brand {
    display: flex;
    align-items: center;
    gap: var(--onyx-spacing-xs);
    text-decoration: none;
  }

  &__logo {
    height: 1.25rem; // same as name/headline font-size
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: var(--onyx-spacing-md);
    width: 100%;
  }
}
</style>
