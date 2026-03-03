<script lang="ts" setup>
import LandingPageHero from "~/components/LandingPageHero.vue";

definePageMeta({ layout: false });

useHead({
  bodyAttrs: {
    // force dark mode
    class: ["dark"],
  },
});
</script>

<template>
  <OnyxPageLayout no-padding>
    <LandingPageHero />

    <!-- comment in once more content is implemented -->
    <!-- <div class="onyx-grid-layout"></div> -->
  </OnyxPageLayout>
</template>
