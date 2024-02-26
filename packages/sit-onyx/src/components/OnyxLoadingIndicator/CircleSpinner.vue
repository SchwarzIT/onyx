<script lang="ts" setup></script>

<template>
  <svg class="onyx-circle-spinner" viewBox="0 0 50 50">
    <circle class="onyx-circle-spinner__circle" cx="50%" cy="50%" r="45%" />
  </svg>
</template>

<style lang="scss">
.onyx-circle-spinner {
  :where(&) {
    --indicator-size: 24px;
    --stroke-color: currentColor;
  }

  $timing: ease-out;

  width: var(--indicator-size);
  aspect-ratio: 1;
  animation: onyx-circle-spinner var(--onyx-duration-lg) $timing infinite;

  &__circle {
    fill: transparent;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-dasharray: 300%;
    stroke: var(--stroke-color);
    stroke-dashoffset: 90%;
    animation: onyx-circle-spinner-stroke var(--onyx-duration-lg) $timing infinite;
  }

  @keyframes onyx-circle-spinner {
    100% {
      transform: rotate(1turn);
    }
  }

  @keyframes onyx-circle-spinner-stroke {
    0% {
      stroke-dashoffset: 90%;
    }
    80% {
      stroke-dashoffset: 270%;
    }
    100% {
      stroke-dashoffset: 90%;
    }
  }
}
</style>
