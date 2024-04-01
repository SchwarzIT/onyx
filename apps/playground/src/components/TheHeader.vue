<script setup lang="ts">
import moon from "@sit-onyx/icons/moon.svg?raw";
import shareAndroid from "@sit-onyx/icons/share-android.svg?raw";
import sunny from "@sit-onyx/icons/sunny.svg?raw";
import sync from "@sit-onyx/icons/sync.svg?raw";
import type { ReplStore } from "@vue/repl";
import { OnyxHeadline, OnyxIconButton } from "sit-onyx";
import githubLogo from "../assets/github-logo.svg?raw";
import VersionSelect from "./VersionSelect.vue";

const props = defineProps<{
  store: ReplStore;
  dark: boolean;
}>();

const emit = defineEmits<{
  "update:dark": [isDark: boolean];
  reloadPage: [];
}>();

const onyxVersion = defineModel<string>("onyxVersion");

const { store } = props;

const copyLink = async () => {
  await navigator.clipboard.writeText(location.href);
  alert("Sharable URL has been copied to clipboard.");
};

const toggleDark = () => emit("update:dark", !props.dark);
</script>

<template>
  <header class="header">
    <div class="header__brand">
      <img alt="logo" src="/logo.svg" class="header__logo" />
      <OnyxHeadline is="h1">Playground</OnyxHeadline>
    </div>

    <div class="header__actions">
      <VersionSelect
        v-model="onyxVersion"
        pkg="sit-onyx"
        label="onyx Version"
        include-pre-releases
      />

      <VersionSelect v-model="store.vueVersion" pkg="vue" label="Vue Version" />

      <VersionSelect
        v-model="store.typescriptVersion"
        pkg="typescript"
        label="TypeScript Version"
      />

      <OnyxIconButton
        label="Toggle dark mode"
        :icon="props.dark ? moon : sunny"
        variation="secondary"
        @click="toggleDark"
      />

      <OnyxIconButton
        label="Copy sharable URL"
        :icon="shareAndroid"
        variation="secondary"
        @click="copyLink"
      />

      <OnyxIconButton
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
        <OnyxIconButton label="View on GitHub" :icon="githubLogo" variation="secondary" />
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
  }

  &__logo {
    height: 1.5rem;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: var(--onyx-spacing-4xs);
    width: 100%;
  }
}
</style>
