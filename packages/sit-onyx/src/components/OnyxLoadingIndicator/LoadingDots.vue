<template>
  <div class="onyx-loading-dots">
    <span class="onyx-loading-dots__dot"></span>
  </div>
</template>

<style lang="scss">
$max-shrink: calc(-1 * var(--dot-size) / 2);

@mixin define-keyframes($name, $offset) {
  @keyframes #{$name} {
    0% {
      box-shadow: $offset 0 0 $max-shrink;
    }
    30% {
      box-shadow: $offset 0 0 1px;
    }
    60% {
      box-shadow: $offset 0 0 $max-shrink;
    }
  }
}

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

  $offset-dot-1: var(--indicator-size);
  $offset-dot-2: calc($offset-dot-1 + var(--indicator-size) / 3);
  $offset-dot-3: calc($offset-dot-1 + 2 * var(--indicator-size) / 3);

  &__dot {
    position: relative;
    left: calc(-1 * $offset-dot-2);
    width: var(--dot-size);
    height: var(--dot-size);
    border-radius: var(--onyx-radius-full);
    background-color: currentColor;
    color: currentColor;
    box-shadow: $offset-dot-2 0 0 $max-shrink;
    animation: onyx-loading-dots var(--duration) infinite linear;
    animation-delay: calc(var(--duration) / 6);

    &::before,
    &::after {
      content: "";
      display: inline-block;
      position: absolute;
      top: 0;
      width: var(--dot-size);
      height: var(--dot-size);
      border-radius: var(--onyx-radius-full);
    }

    &::before {
      box-shadow: $offset-dot-1 0 0 $max-shrink;
      animation: onyx-loading-dots-before var(--duration) infinite linear;
    }

    &::after {
      box-shadow: $offset-dot-3 0 0 $max-shrink;
      animation: onyx-loading-dots-after var(--duration) infinite linear;
      animation-delay: calc(var(--duration) / 3);
    }
  }

  @include define-keyframes(onyx-loading-dots-before, $offset-dot-1);
  @include define-keyframes(onyx-loading-dots, $offset-dot-2);
  @include define-keyframes(onyx-loading-dots-after, $offset-dot-3);
}
</style>
