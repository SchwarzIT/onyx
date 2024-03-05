<script lang="ts" setup></script>

<template>
  <div class="toast-controller">
    <div class="toast">Toast message 1</div>
    <div class="toast">Toast message 2</div>
  </div>
</template>

<style lang="scss" scoped>
.toast-controller {
  width: min(31.25rem, calc(100% - 6rem));
  height: fit-content;
  position: absolute;
  bottom: 0;
  left: var(--onyx-spacing-2xl);
  right: var(--onyx-spacing-2xl);
  margin: auto;
}
.toast {
  background-color: rgba(0, 0, 0, 0.7);
  outline: 1px solid #efefef;
  color: white;
  padding: var(--onyx-spacing-md);
}
</style>
