<script setup lang="ts">
import moon from "@sit-onyx/icons/moon.svg?raw";
import shareAndroid from "@sit-onyx/icons/share-android.svg?raw";
import sunny from "@sit-onyx/icons/sunny.svg?raw";
import sync from "@sit-onyx/icons/sync.svg?raw";
import type { ReplStore } from "@vue/repl";
import { OnyxIconButton } from "sit-onyx";
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

const { store } = props;

const copyLink = async () => {
  await navigator.clipboard.writeText(location.href);
  alert("Sharable URL has been copied to clipboard.");
};

const toggleDark = () => emit("update:dark", !props.dark);
</script>

<template>
  <nav>
    <h1>
      <img alt="logo" src="/logo.svg" />
      <span>Playground</span>
    </h1>

    <div class="links">
      <VersionSelect
        v-model="store.typescriptVersion"
        pkg="typescript"
        label="TypeScript Version"
      />

      <VersionSelect v-model="store.vueVersion" pkg="vue" label="Vue Version" />

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
  </nav>
</template>

<style>
nav {
  --bg: #fff;
  --bg-light: #fff;
  --border: #ddd;
  --btn: #666;
  --highlight: #333;
  --green: #3ca877;
  --purple: #904cbc;
  --btn-bg: #eee;

  color: var(--base);
  height: var(--nav-height);
  box-sizing: border-box;
  padding: 0 1em;
  background-color: var(--bg);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.33);
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: space-between;
}

.dark nav {
  --base: #ddd;
  --bg: #1a1a1a;
  --bg-light: #242424;
  --border: #383838;
  --highlight: #fff;
  --btn-bg: #333;

  box-shadow: none;
  border-bottom: 1px solid var(--border);
}

h1 {
  font-weight: 500;
  display: inline-flex;
  place-items: center;
}

h1 img {
  height: 24px;
  margin-right: 10px;
}

@media (max-width: 560px) {
  h1 span {
    font-size: 0.9em;
  }
}

@media (max-width: 520px) {
  h1 span {
    display: none;
  }
}

.links {
  display: flex;
  align-items: center;
}

.version:hover .active-version::after {
  border-top-color: var(--btn);
}

.dark .version:hover .active-version::after {
  border-top-color: var(--highlight);
}

.versions {
  display: none;
  position: absolute;
  left: 0;
  top: 40px;
  background-color: var(--bg-light);
  border: 1px solid var(--border);
  border-radius: 4px;
  list-style-type: none;
  padding: 8px;
  margin: 0;
  width: 200px;
  max-height: calc(100vh - 70px);
  overflow: scroll;
}

.versions a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
  cursor: pointer;
  color: var(--base);
}

.versions a:hover {
  color: var(--green);
}

.versions.expanded {
  display: block;
}

.links > * {
  display: flex;
  align-items: center;
}

.links > * + * {
  margin-left: 4px;
}
</style>
