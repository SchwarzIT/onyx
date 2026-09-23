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

    <div class="onyx-grid-layout sections">
      <LandingSectionOffers />
      <LandingSectionTeam />
    </div>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.sections {
  display: flex;
  flex-direction: column;
  gap: 14rem;
}
</style>
