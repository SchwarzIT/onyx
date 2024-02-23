<script lang="ts" setup></script>

<template>
  <Teleport to="body">
    <div class="backdrop">
      <div class="demo popover">
        <h3>Popover / Modal content</h3>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped></style>
