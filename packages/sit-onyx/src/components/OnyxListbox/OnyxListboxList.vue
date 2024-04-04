<template>
  <ul class="onyx-listbox-options">
    <slot></slot>
  </ul>
</template>

<style lang="scss">
.onyx-listbox-options {
  max-height: calc(var(--max-options) * var(--option-height));
  box-sizing: border-box;
  overflow: auto;
  outline: none;

  margin: 0;
  padding: 0;
  list-style: none;

  .onyx-listbox-option {
    height: var(--option-height);
  }
}
</style>
