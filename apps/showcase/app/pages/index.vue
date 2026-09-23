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
      <LandingSectionContributors />
    </div>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.sections {
  display: flex;
  flex-direction: column;
  gap: clamp(6rem, 10vw, 14rem);
}
</style>
