<template>
  <figure class="onyx-skeleton"></figure>
</template>

<style lang="scss">
.onyx-skeleton {
  :where(&) {
    margin: 0;
    display: inline-block;
  }

  border-radius: var(--onyx-radius-sm);
  background-color: var(--onyx-color-base-neutral-200);

  // TODO: remove
  width: 8rem;
  height: 3rem;
}
</style>
