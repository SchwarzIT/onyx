<script lang="ts" setup>
import { data as browsersData } from "#src/.vitepress/browser-loader.data";
</script>

<template>
  <ul class="list">
    <li v-for="browser in browsersData.browsers" :key="browser.id" class="browser">
      <img
        :src="browser.image"
        :alt="`Logo for ${browser.name} browser`"
        width="40px"
        height="40px"
        class="browser__image"
      />
      <p class="browser__name">{{ browser.name }}</p>
      <p class="browser__version">Version ≥ {{ browser.version }}</p>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list {
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

  &__version,
  &__name {
    margin: 0;
    line-height: 1.3;
  }

  &__name {
    padding-top: var(--onyx-spacing-xs);
    font-weight: var(--onyx-font-weight-semibold);
  }

  &__image {
    position: relative;
    width: 40px;
    height: 40px;
  }
}
</style>
