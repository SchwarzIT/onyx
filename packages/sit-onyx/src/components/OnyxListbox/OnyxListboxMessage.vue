<template>
  <span class="onyx-listbox-message onyx-text--small">
    <slot></slot>
  </span>
</template>

<style lang="scss">
.onyx-listbox-message {
  color: var(--onyx-color-text-icons-neutral-soft);
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  text-align: right;
  padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm) 0;
}
</style>
