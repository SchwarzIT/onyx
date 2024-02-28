<template>
  <svg class="onyx-loading-dots" viewBox="0 0 32 32">
    <circle class="onyx-loading-dots__circle" cx="5" cy="16" r="3" />
    <circle class="onyx-loading-dots__circle" cx="16" cy="16" r="2" />
    <circle class="onyx-loading-dots__circle" cx="27" cy="16" r="3" />
  </svg>
</template>

<style lang="scss">
.onyx-loading-dots {
  --duration: var(--onyx-duration-md);

  width: 24px;
  aspect-ratio: 1;
  fill: currentColor;

  &__circle {
    animation: onyx-loading-dots var(--duration) infinite alternate;

    &:nth-child(2) {
      animation-delay: calc(var(--duration) / 2);
    }

    &:last-child {
      animation-delay: var(--duration);
    }
  }

  @keyframes onyx-loading-dots {
    0% {
      opacity: 1;
    }

    50%,
    100% {
      opacity: 0.2;
    }
  }
}
</style>
