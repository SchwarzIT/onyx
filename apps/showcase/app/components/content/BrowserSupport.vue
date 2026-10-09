<script setup lang="ts">
const { data: browsers } = await useFetch("/api/browsers", {
  key: "supported-browsers",
  default: () => [],
});
</script>

<template>
  <ul class="list">
    <li v-for="browser in browsers" :key="browser.id" class="browser">
      <img
        :src="`/images/browsers/${browser.id}.svg`"
        :alt="`Logo for ${browser.name} browser`"
        width="40px"
        height="40px"
        class="browser__image"
      />

      <div>
        <OnyxHeadline is="h3">{{ browser.name }}</OnyxHeadline>
        <p class="browser__version">Version ≥ {{ browser.version }}</p>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--onyx-density-xl);
  margin: 0;
  padding: 0;
}

.browser {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-md);

  &__image {
    display: block;
    width: 3rem;
    height: 3rem;
  }
}
</style>
