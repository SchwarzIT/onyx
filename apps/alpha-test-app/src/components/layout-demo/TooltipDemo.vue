<script lang="ts" setup>
defineProps<{
  forceTooltip?: boolean;
}>();
</script>

<template>
  <div class="tooltip-parent">
    <div class="demo tooltip" :class="{ 'tooltip--forced': forceTooltip }">
      Tooltip parent
      <div class="tooltip__text">Hello world Hello world Hello world Hello world</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tooltip-parent {
  position: relative;
}
.tooltip {
  &:hover,
  &--forced {
    .tooltip__text {
      visibility: inherit;
    }
  }
  &__text {
    position: absolute;
    top: 28px;
    left: 0;
    z-index: var(--onyx-z-index-flyout);
    visibility: hidden;
  }
}

.tooltip {
  padding: 4px;
  width: fit-content;
  &__text {
    padding: 4px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    width: 450px;
  }
}
</style>
