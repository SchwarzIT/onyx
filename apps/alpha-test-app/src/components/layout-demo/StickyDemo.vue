<script lang="ts" setup></script>

<template>
  <div class="sticky-content">Sticky content. Example: Breadcrumb bar, Table header, Headlines</div>
</template>

<style lang="scss" scoped>
.sticky-content {
  position: sticky;
  top: 0;
  z-index: var(--onyx-z-index-sticky-content);
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
  background-color: var(--onyx-color-base-background-blank);
  opacity: 0.95;
  padding: var(--onyx-spacing-lg);
}
</style>
