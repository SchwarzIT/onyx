<template>
  <div class="onyx-circle-spinner"></div>
</template>

<style lang="scss">
.onyx-circle-spinner {
  :where(&) {
    --indicator-size: 24px;
    --stroke-width: 2px;
    --stroke-color: currentColor;
  }

  // stroke gap (missing part of the circle), same as in icon loading-circle.svg
  $stroke-gap: 25%;

  width: var(--indicator-size);
  aspect-ratio: 1;
  border-radius: var(--onyx-radius-full);
  background:
    radial-gradient(farthest-side, var(--stroke-color) 94%, #0000) top/var(--stroke-width)
      var(--stroke-width) no-repeat,
    conic-gradient(#0000 #{$stroke-gap}, var(--stroke-color));
  mask: radial-gradient(farthest-side, #0000 calc(100% - var(--stroke-width)), #000 0);

  animation: 0.8s cubic-bezier(0.5, 0.25, 0.4, 0.9) 0s infinite normal none running
    onyx-circle-spinner;

  @keyframes onyx-circle-spinner {
    100% {
      transform: rotate(1turn);
    }
  }

  @media (prefers-reduced-motion) {
    animation: none;
  }
}
</style>
