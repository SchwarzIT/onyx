<template>
  <figure class="onyx-skeleton"></figure>
</template>

<style lang="scss">
.onyx-skeleton {
  :where(&) {
    margin: 0;
    display: inline-block;
    border-radius: var(--onyx-radius-sm);
  }

  background: linear-gradient(
    to right,
    var(--onyx-color-base-neutral-200) 20%,
    var(--onyx-color-base-neutral-300) 40%,
    var(--onyx-color-base-neutral-200) 60%
  );
  background-size: 500% 100%;
  animation: onyx-skeleton var(--onyx-duration-xl) ease infinite;

  @keyframes onyx-skeleton {
    0% {
      background-position: 100% 50%;
    }
    75% {
      background-position: 0 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
}
</style>
