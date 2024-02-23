<script lang="ts" setup>
const forceTooltip = defineModel<boolean>();
</script>

<template>
  <div class="demo tooltip" :class="{ 'tooltip--forced': forceTooltip }">
    Tooltip parent
    <div class="tooltip__text">Hello world Hello world Hello world Hello world</div>
  </div>
</template>

<style lang="scss" scoped></style>
