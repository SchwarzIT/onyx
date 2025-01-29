<script setup lang="ts">
definePageMeta({
  layout: false,
});

const route = useRoute();
const { data } = await useAsyncData(() => queryCollection("landing").path(route.path).first());

useSeoMeta({
  ...data.value?.seo,
});
</script>

<template>
  <div v-if="!data" class="onyx-grid-container">
    <OnyxEmpty> Page not found. </OnyxEmpty>
  </div>

  <div v-else>
    <div class="hero">
      <OnyxHeadline is="h1">This is the landing page</OnyxHeadline>
    </div>

    <div class="onyx-grid-container">
      <ContentRenderer :value="data" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  height: 24rem;
  background-color: var(--onyx-color-base-neutral-200);
  padding: var(--onyx-grid-margin);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
