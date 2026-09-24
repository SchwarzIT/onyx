<script lang="ts" setup>
definePageMeta({
  layout: false,
  colorMode: "dark", // force dark mode
});
</script>

<template>
  <NuxtLayout name="default">
    <template #hero>
      <LandingSectionHero />
    </template>

    <div class="sections">
      <LandingSectionOffers />
      <LandingSectionTeam />
      <LandingSectionContributors />
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.sections {
  display: flex;
  flex-direction: column;
  gap: clamp(6rem, 10vw, 14rem);
}
</style>
