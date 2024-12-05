<template>
  <svg class="onyx-component onyx-circle-spinner" viewBox="0 0 50 50">
    <circle class="onyx-circle-spinner__circle" cx="50%" cy="50%" r="45%" />
  </svg>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "sass:math";

// must be the same as "r" attribute of the <circle> in HTML (without %)
$radius: 45;

/**
* Calculates the stroke length for the circle spinner.
* @param $percentage: Stroke percentage that should be covered.
*/
@function calculate-stroke-length($percentage) {
  $length: $percentage * math.$pi * $radius;
  @return math.div($length, 100);
}
.onyx-circle-spinner {
  @include layers.component() {
    --indicator-size: 1.5rem;
    --stroke-color: currentColor;

    $stroke-gap: 25; // stroke gap in percent, same as in icon loading-circle.svg
    $timing: cubic-bezier(0.4, 0.35, 0.7, 0.8);
    $default-stroke-dasharray: calculate-stroke-length(100 - $stroke-gap)
      calculate-stroke-length($stroke-gap);

    width: var(--indicator-size);
    aspect-ratio: 1;
    animation: onyx-circle-spinner var(--onyx-duration-lg) $timing infinite;

    &__circle {
      fill: transparent;
      stroke-width: 2px;
      stroke-linecap: round;
      stroke: var(--stroke-color);
      stroke-dasharray: $default-stroke-dasharray;

      // add dashoffset so the gap starts from top, counter-clockwise, just like the loading-circle.svg icon
      stroke-dashoffset: calculate-stroke-length(25);

      animation: onyx-circle-spinner-stroke var(--onyx-duration-lg) $timing infinite;
    }

    /**
    * Animates the circle by spinning/rotating it.
    */
    @keyframes onyx-circle-spinner {
      100% {
        transform: rotate(1turn);
      }
    }

    /**
    * Animates the stroke gap from 25% to 75% to 25%.
    */
    @keyframes onyx-circle-spinner-stroke {
      0% {
        stroke-dasharray: $default-stroke-dasharray;
      }
      75% {
        stroke-dasharray: calculate-stroke-length(25) calculate-stroke-length(75);
      }
      100% {
        stroke-dasharray: $default-stroke-dasharray;
      }
    }
  }
}
</style>
