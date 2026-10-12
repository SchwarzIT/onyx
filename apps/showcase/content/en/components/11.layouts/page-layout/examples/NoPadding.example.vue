<script lang="ts" setup>
import { OnyxAppLayout, OnyxPageLayout } from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout no-padding>
      <section class="hero"></section>

      <div class="onyx-grid-layout">Place your main page content here...</div>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.hero {
  background-color: var(--onyx-color-base-background-blank);
  border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  height: 8rem;
  background-image: url("https://picsum.photos/id/13/1920/400");
  background-size: cover;
  background-position: center;
}
</style>
