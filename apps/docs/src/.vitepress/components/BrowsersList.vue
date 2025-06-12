<script lang="ts" setup>
import { data as browsersData } from "#src/.vitepress/browser-loader.data";

const browsers = browsersData.browsers.filter((b) => b.coverage > 0);

const popularBrowsers = ["chrome", "edge", "firefox", "safari", "samsung", "ios_saf"];

const filteredBrowsers = popularBrowsers
  .map((b) => {
    const browser = browsers.find((browser) => browser.id === b);
    if (!browser) return;
    return {
      ...browser,
      minVersion: Object.keys(browser.versions).sort()[0],
      image: `/images/browsers/${browser.id}.svg`,
    };
  })
  .filter((b) => !!b);
</script>

<template>
  <ul class="browsersList">
    <li v-for="browser in filteredBrowsers" :key="browser.name" class="browser">
      <img
        :src="browser.image"
        :alt="`${browser.name} image`"
        width="40px"
        height="40px"
        class="browser__image"
      />
      <p class="browser__name">{{ browser.name }}</p>
      <p>Version ≥ {{ browser.minVersion }}</p>
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
    font-weight: var(--onyx-font-weight-medium);
  }
  &__image {
    position: relative;
    width: 40px;
    height: 40px;
  }
}
</style>
