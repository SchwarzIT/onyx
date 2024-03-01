<template>
  <div class="onyx-loading-dots">
    <span class="onyx-loading-dots__dot"></span>
  </div>
</template>

<style lang="scss">
$max-shrink: calc(-1 * var(--dot-size) / 2);
$offset: calc(-0.5 * var(--indicator-size) - var(--dot-size) / 2);

.onyx-loading-dots {
  :where(&) {
    --indicator-size: 24px;
  }

  --dot-size: calc(0.25 * var(--indicator-size));
  --duration: var(--onyx-duration-lg);

  width: var(--indicator-size);
  aspect-ratio: 1;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  &__dot {
    background-color: transparent;

    position: relative;
    bottom: $offset;
    width: var(--dot-size);
    height: var(--dot-size);
    border-radius: var(--onyx-radius-full);
    box-shadow: 0 0 0 $max-shrink;

    $animation: onyx-loading-dots var(--duration) infinite linear;
    animation: $animation;
    animation-delay: calc(var(--duration) / 6);

    &::before,
    &::after {
      content: "";
      display: inline-block;
      position: absolute;
      width: var(--dot-size);
      height: var(--dot-size);
      border-radius: var(--onyx-radius-full);
      animation: $animation;
    }

    &::before {
      box-shadow: 0 0 0 $max-shrink;
      left: calc(-1 * var(--dot-size));
    }

    &::after {
      box-shadow: 0 0 0 $max-shrink;
      animation-delay: calc(var(--duration) / 3);
      right: calc(-1 * var(--dot-size));
    }
  }

  @keyframes onyx-loading-dots {
    0% {
      box-shadow: 0 $offset 0 $max-shrink;
    }
    30% {
      box-shadow: 0 $offset 0 0px;
    }
    60% {
      box-shadow: 0 $offset 0 $max-shrink;
    }
  }
}
</style>
