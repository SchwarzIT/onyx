<script lang="ts" setup>
import { data as browsersData } from "#src/.vitepress/browser-loader.data";

const browsers = browsersData.browsers.filter((b) => b.coverage > 0);

const popularBrowsers = ["chrome", "edge", "firefox", "safari", "samsung", "ios_saf"];

const filteredBrowsers = popularBrowsers
  .map((b) => {
    const browser = browsers.find((browser) => browser.id === b);
    return browser
      ? {
          ...browser,
          minVersion: Object.keys(browser.versions).sort()[0],
        }
      : undefined;
  })
  .filter((b) => !!b);
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
        loading="lazy"
      />
      <p class="browser__name">{{ name }}</p>
      <p>Version ≥ {{ minVersion }}</p>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.browsersList {
  display: flex;
  flex-wrap: wrap;
  gap: var(--onyx-spacing-xl);
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
    width: 40px;
    height: 40px;
  }
}
</style>
