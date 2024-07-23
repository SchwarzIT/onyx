<script lang="ts" setup>
import { computed, ref } from "vue";
import { RippleConfig, useRipple } from "../../composables/useRipple";

/**
  TODO: 
  - settings props
  - test events
  - unit test for composable
 */

const rippleTrigger = ref<HTMLElement>();

const config = computed<RippleConfig>(() => ({
  terminateOnPointerUp: false,
  color: "var(--onyx-ripple-color, var(--onyx-color-base-primary-600))",
  trigger: rippleTrigger,
  duration: "300ms",
  durationLeave: "100ms",
  container: rippleTrigger,
}));

const { ripples, hideRipple, events } = useRipple(config);
</script>

<template>
  <span ref="rippleTrigger" class="onyx-ripple" v-on="events">
    <transition-group name="onyx-ripple" @after-enter="hideRipple">
      <span
        v-for="[key, r] in ripples"
        :key="key"
        class="onyx-ripple__element"
        :style="{
          left: r.left,
          top: r.top,
          width: r.radius,
          height: r.radius,
          backgroundColor: r.backgroundColor,
        }"
        :data-rippleid="key"
      ></span>
    </transition-group>
  </span>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/density.scss";

.onyx-ripple {
  display: block;
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;

  &__element {
    display: block;
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    transition:
      opacity,
      transform 0ms cubic-bezier(0, 0, 0.2, 1);
  }
}

.onyx-ripple-enter-active,
.onyx-ripple-leave-active {
  transition-property: opacity, scale;
  transition-timing-function: ease;
  transition-duration: v-bind("config.duration");
  @media (prefers-reduced-motion) {
    transition-duration: 1ms;
  }
}

.onyx-ripple-leave-active {
  transition-duration: v-bind("config.durationLeave");
  @media (prefers-reduced-motion) {
    transition-duration: 1ms;
  }
}

.onyx-ripple-enter-from {
  scale: 0;
}

.onyx-ripple-leave-to {
  opacity: 0;
}
</style>
