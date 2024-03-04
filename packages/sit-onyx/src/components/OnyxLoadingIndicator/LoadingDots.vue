<template>
  <svg class="onyx-loading-dots" viewBox="0 0 32 32">
    <circle class="onyx-loading-dots__circle" cx="5" cy="16" r="3" />
    <circle class="onyx-loading-dots__circle" cx="16" cy="16" r="2" />
    <circle class="onyx-loading-dots__circle" cx="27" cy="16" r="3" />
  </svg>
</template>

<style lang="scss">
.onyx-loading-dots {
  :where(&) {
    --indicator-size: 24px;
  }

  width: var(--indicator-size);
  aspect-ratio: 1;
  fill: currentColor;

  $duration: var(--onyx-duration-md);

  &__circle {
    animation: onyx-loading-dots $duration infinite alternate;

    &:nth-child(2) {
      animation-delay: calc(#{$duration} / 2);
    }

    &:last-child {
      animation-delay: $duration;
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
