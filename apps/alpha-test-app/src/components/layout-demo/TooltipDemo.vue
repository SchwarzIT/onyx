<script lang="ts" setup>
defineProps<{
  forceTooltip?: boolean;
}>();
</script>

<template>
  <div class="tooltip-demo">
    <div class="tooltip" :class="{ 'tooltip--forced': forceTooltip }">
      Tooltip parent
      <div class="tooltip__text">Hello world Hello world Hello world Hello world</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tooltip-demo {
  position: relative;
}
.tooltip {
  padding: var(--onyx-spacing-4xs);
  width: fit-content;

  &__text {
    padding: var(--onyx-spacing-4xs);
    border-radius: var(--onyx-radius-sm);
    background-color: rgba(0, 0, 0, 0.7);
    color: var(--onyx-color-base-background-blank);
    width: 9.375rem;
    position: absolute;
    top: 1.75rem;
    left: 0;
    z-index: var(--onyx-z-index-flyout);
    visibility: hidden;
  }

  &:hover,
  &--forced {
    .tooltip__text {
      visibility: inherit;
    }
  }
}
</style>
