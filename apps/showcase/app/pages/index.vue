<script lang="ts" setup>
definePageMeta({
  layout: false,
  colorMode: "dark", // force dark mode
});

useHead({
  htmlAttrs: {
    class: "onyx-theme-digits",
  },
});
</script>

<template>
  <OnyxPageLayout no-padding>
    <LandingSectionHero />

    <div class="onyx-grid-layout">
      <LandingSectionOffers />
    </div>
  </OnyxPageLayout>
</template>
