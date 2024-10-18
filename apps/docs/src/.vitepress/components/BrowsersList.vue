<script lang="ts" setup>
import { data as browsersData } from "#src/.vitepress/browser-loader.data";

const browsers = browsersData.browsers.filter((b) => b.coverage > 0);

const popularBrowsers = ["chrome", "edge", "firefox", "safari", "samsung", "ios_saf"];

const filteredBrowsers = popularBrowsers.map((pb) => {
  const b = browsers.find((b) => b.id === pb);
  return {
    ...b,
    minVersion: b?.versions ? Object.keys(b.versions).sort()[0] : "",
  };
});
</script>

<template>
  <ul class="browsersList">
    <li v-for="{ name, minVersion, id } in filteredBrowsers" :key="name" class="browser">
      <img
        :src="`/assets/browsers/${id}.svg`"
        :alt="`${name} icon`"
        width="40px"
        height="40px"
        class="browser__image"
      />
      <p class="browser__name">{{ name }}</p>
      <p>Version ≥ {{ minVersion }}</p>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.browsersList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  row-gap: var(--onyx-spacing-lg);
  margin: 0;
  padding: 0;
  margin-bottom: var(--onyx-spacing-lg);
}

.browser {
  list-style: none;
  padding: 0;
  margin: 0;
  p {
    margin: 0;
    line-height: 1.3;
  }
  &__name {
    padding-top: var(--onyx-spacing-xs);
    font-weight: 600;
  }
  &__image {
    position: relative;
    transform: translateX(-4px);
  }
}
</style>
