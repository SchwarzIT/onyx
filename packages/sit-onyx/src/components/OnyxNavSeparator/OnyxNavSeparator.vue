<script lang="ts" setup>
// the empty <script setup> is needed for Storybook to correctly generate
// the source code
</script>

<template>
  <div class="onyx-separator" role="separator" aria-orientation="vertical"></div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-separator {
  @include layers.component() {
    background-color: var(--onyx-color-base-neutral-300);
    margin: 0 var(--onyx-spacing-2xs);
    width: var(--onyx-1px-in-rem);
    min-height: 2rem;
    height: 100%;
    max-height: 100%;
  }
}
</style>
