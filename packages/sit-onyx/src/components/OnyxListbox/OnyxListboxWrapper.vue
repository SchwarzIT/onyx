<template>
  <div class="onyx-listbox">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.onyx-listbox {
  :where(&) {
    --max-options: 8;
  }

  --option-height: calc(1.5rem + 2 * var(--onyx-spacing-2xs));

  border-radius: var(--onyx-radius-md);
  background-color: var(--onyx-color-base-background-blank);
  padding: var(--onyx-spacing-2xs) 0;
  box-shadow: var(--onyx-shadow-medium-bottom);
  box-sizing: border-box;
  width: max-content;
  min-width: var(--onyx-spacing-4xl);
  max-width: 20rem;
  font-family: var(--onyx-font-family);

  &:has(&__options:focus-visible) {
    outline: 0.25rem solid var(--onyx-color-base-primary-200);
  }
}
</style>
