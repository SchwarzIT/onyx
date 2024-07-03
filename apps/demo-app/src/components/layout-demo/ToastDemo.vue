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
  background-color: var(--onyx-color-base-neutral-900);
  opacity: 0.9;
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-100);
  color: var(--onyx-color-text-icons-neutral-inverted);
  padding: var(--onyx-spacing-md);
}
</style>
