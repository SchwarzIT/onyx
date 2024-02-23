<script lang="ts" setup>
defineProps<{
  forceTooltip: boolean;
}>();
</script>

<template>
  <div class="demo tooltip" :class="{ 'tooltip--forced': forceTooltip }">
    Tooltip parent
    <div class="tooltip__text">Hello world Hello world Hello world Hello world</div>
  </div>
</template>

<style lang="scss" scoped>
.tooltip {
  padding: 4px;
  width: fit-content;
  &__text {
    padding: 4px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    width: 150px;
  }
}
</style>
