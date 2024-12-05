<template>
  <div class="onyx-component onyx-loading-dots">
    <span class="onyx-loading-dots__center"></span>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

/** Animation duration. */
$duration: var(--onyx-duration-lg);

/** Max size the dot should shrink in the animation. Must be a negative value. */
$max-shrink: calc(-1 * var(--dot-size) / 2);

/**
* Defines the box shadow.
* @param $shrink: Shrink factor. Set to 0 (default) to not shrink the box shadow.
*/
@mixin define-box-shadow($shrink: 0) {
  box-shadow: 0 var(--dot-size) 0 $shrink;
}

/**
 * Defines a single dot.
 */
@mixin define-dot() {
  @include define-box-shadow;

  position: absolute;
  background-color: transparent;
  width: var(--dot-size);
  aspect-ratio: 1;
  border-radius: var(--onyx-radius-full);
  animation: onyx-loading-dots $duration infinite linear;
}

.onyx-loading-dots {
  @include layers.component() {
    --indicator-size: 1.5rem;

    /** Default (non-animated) size of a single dot. */
    --dot-size: calc(0.25 * var(--indicator-size));

    width: var(--indicator-size);
    aspect-ratio: 1;
    position: relative;

    &__center {
      @include define-dot;
      animation-delay: calc($duration / 6);

      // center horizontally
      left: calc(50% - 0.5 * var(--dot-size));

      // center vertically + move the dot up by 1 dot size so it does not cover the box shadow
      top: calc(50% - 1.5 * var(--dot-size));

      &::before,
      &::after {
        content: "";
        @include define-dot;
      }

      $dot-offset: calc(-0.5 * var(--indicator-size) + 0.5 * var(--dot-size));

      &::before {
        left: $dot-offset;
      }

      &::after {
        right: $dot-offset;
        animation-delay: calc($duration / 3);
      }
    }

    /**
    * Animates the box shadow of the dots with a pulsing effect (grow and shrink).
    */
    @keyframes onyx-loading-dots {
      0% {
        // this will show the dot by setting the shrink to 0.
        @include define-box-shadow(0);
      }
      33% {
        // shrink dot so its getting smaller
        @include define-box-shadow($max-shrink);
      }
      66% {
        @include define-box-shadow($max-shrink);
      }
    }
  }
}
</style>
