<script setup lang="ts">
import { iconMoon, iconShareAndroid, iconSunny, iconSync } from "@sit-onyx/icons";
import logoUrl from "../../../docs/src/public/images/logo.svg";
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
  alert("URL has been copied to the clipboard.");
};
</script>

<template>
  <header class="header">
    <a class="header__brand" href="https://onyx.schwarz" target="_blank">
      <img alt="logo" :src="logoUrl" class="header__logo" />
      <h1 class="onyx-headline onyx-headline--h2">Playground</h1>
    </a>

    <div class="header__actions">
      <VersionSelect
        v-model="onyxVersion"
        class="header__version"
        pkg="sit-onyx"
        label="onyx version"
        include-pre-releases
      />

      <VersionSelect v-model="vueVersion" class="header__version" pkg="vue" label="Vue version" />

      <VersionSelect
        v-model="typescriptVersion"
        class="header__version"
        pkg="typescript"
        label="TypeScript version"
      />

      <HeaderIconButton
        label="Toggle dark mode"
        :icon="isDark ? iconMoon : iconSunny"
        @click="isDark = !isDark"
      />

      <HeaderIconButton label="Copy URL" :icon="iconShareAndroid" @click="copyLink" />

      <HeaderIconButton label="Reload page" :icon="iconSync" @click="emit('reloadPage')" />

      <a
        href="https://github.com/SchwarzIt/onyx/tree/main/apps/playground"
        target="_blank"
        aria-label="View on GitHub"
      >
        <HeaderIconButton label="View on GitHub" :icon="githubLogo" />
      </a>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "sit-onyx/breakpoints.scss";

.header {
  box-sizing: border-box;
  padding: var(--onyx-spacing-2xs) var(--onyx-spacing-md);
  width: 100%;
  border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--onyx-spacing-sm);

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
    align-items: flex-end;
    justify-content: flex-end;
    gap: var(--onyx-spacing-sm) var(--onyx-spacing-md);
    width: 100%;
  }

  &__version {
    width: 12rem;
  }

  @include breakpoints.screen(max, md) {
    flex-direction: column;
    align-items: flex-start;

    .header__actions {
      justify-content: flex-start;
    }

    .header__version {
      width: 8rem;
    }
  }
}
</style>
