<script lang="ts" setup>
import { useTemplateRef } from "vue";
import { useRipple } from "../../composables/useRipple.js";

const rippleTrigger = useTemplateRef("rippleTriggerRef");
const { ripples, hideRipple, events } = useRipple(rippleTrigger);

defineExpose({
  events,
});
</script>

<template>
  <span ref="rippleTriggerRef" class="onyx-component onyx-ripple" aria-hidden="true">
    <span
      v-for="[key, ripple] in ripples"
      :key="key"
      class="onyx-ripple__element"
      :style="{
        '--onyx-ripple-left': ripple.left,
        '--onyx-ripple-top': ripple.top,
      }"
      :data-rippleid="key"
      @animationend="hideRipple($event.target as HTMLElement)"
    ></span>
  </span>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

@property --onyx-ripple-radius {
  syntax: "<percentage>";
  initial-value: 0%;
  inherits: false;
}

.onyx-ripple {
  @include layers.component() {
    --onyx-ripple-color: var(--onyx-color-base-primary-600);

    display: block;
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: inherit;
    width: 100%;
    height: 100%;

    &__element {
      display: block;
      position: absolute;
      pointer-events: none;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at var(--onyx-ripple-left) var(--onyx-ripple-top),
        transparent var(--onyx-ripple-radius),
        var(--onyx-ripple-color) var(--onyx-ripple-radius)
      );

      animation: onyx-ripple var(--onyx-duration-sm) cubic-bezier(0, 0, 0.2, 1) forwards;

      @media (prefers-reduced-motion) {
        animation: none;
      }
    }

    @keyframes onyx-ripple {
      0% {
        --onyx-ripple-radius: 0%;
      }

      100% {
        --onyx-ripple-radius: 100%;
      }
    }
  }
}
</style>
