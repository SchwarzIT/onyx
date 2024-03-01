<template>
  <div class="onyx-loading-dots">
    <span class="onyx-loading-dots__dot"></span>
  </div>
</template>

<style lang="scss">
/** Animation duration. */
$duration: var(--onyx-duration-lg);

/** Default (non-animated) size of a single dot. */
$dot-size: calc(0.25 * var(--indicator-size));

$max-shrink: calc(-1 * $dot-size / 2);
$default-box-shadow: 0 $dot-size 0 $max-shrink;

@mixin define-dot() {
  position: absolute;
  background-color: transparent;
  width: $dot-size;
  aspect-ratio: 1;
  border-radius: var(--onyx-radius-full);
  box-shadow: $default-box-shadow;
  animation: onyx-loading-dots $duration infinite linear;
}

.onyx-loading-dots {
  :where(&) {
    --indicator-size: 24px;
  }

  width: var(--indicator-size);
  aspect-ratio: 1;
  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  &__dot {
    @include define-dot();
    top: calc(0.5 * $dot-size);
    animation-delay: calc($duration / 6);

    &::before,
    &::after {
      content: "";
      display: inline-block;
      @include define-dot();
    }

    $dot-offset: calc(-1.5 * $dot-size);

    &::before {
      left: $dot-offset;
    }

    &::after {
      right: $dot-offset;
      animation-delay: calc($duration / 3);
    }
  }

  @keyframes onyx-loading-dots {
    0% {
      box-shadow: $default-box-shadow;
    }
    30% {
      // this will hide the dot (scale it to 0)
      box-shadow: 0 $dot-size 0 0;
    }
    60% {
      box-shadow: $default-box-shadow;
    }
  }
}
</style>
