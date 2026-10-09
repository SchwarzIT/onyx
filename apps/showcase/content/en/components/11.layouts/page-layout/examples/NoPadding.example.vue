<script lang="ts" setup>
import { OnyxAppLayout, OnyxPageLayout } from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout no-padding>
      <section class="hero">
        <div class="hero__content onyx-grid-layout">Place your full width hero content here...</div>
      </section>

      <div class="onyx-grid-layout">Place your main page content here...</div>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.hero {
  background-color: var(--onyx-color-base-background-blank);
  border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);

  &__content {
    padding-block: var(--onyx-density-sm);
  }
}
</style>
