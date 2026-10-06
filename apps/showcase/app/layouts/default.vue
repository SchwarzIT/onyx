<script lang="ts" setup>
defineSlots<{
  default(): unknown;
  hero?(): unknown;
}>();
</script>

<template>
  <OnyxPageLayout no-padding>
    <slot name="hero"></slot>

    <div class="onyx-grid-layout">
      <slot></slot>
    </div>

    <Footer />
  </OnyxPageLayout>
</template>
