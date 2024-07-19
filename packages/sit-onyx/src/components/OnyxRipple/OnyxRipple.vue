<script lang="ts" setup>
import { computed, ref } from "vue";
import { RippleConfig, useRipple } from "../../composables/useRipple";

/**
    - check prefers motion setting
 */

const rippleTrigger = ref<HTMLElement>();

const config = computed<RippleConfig>(() => ({
  terminateOnPointerUp: false,
  color: "var(--onyx-ripple-color)",
  trigger: rippleTrigger,
  duration: "300ms",
  durationLeave: "100ms",
  container: rippleTrigger,
}));

const { ripples, hideRipple, events } = useRipple(config);
</script>

<template>
  <span ref="rippleTrigger" class="onyx-ripple" v-on="events">
    <transition-group name="ripple" @after-enter="hideRipple">
      <span
        v-for="[key, r] in ripples"
        :key="key"
        class="onyx-ripple__element"
        :style="{
          left: r.x + 'px',
          top: r.y + 'px',
          width: r.radius + 'px',
          height: r.radius + 'px',
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
  --onyx-ripple-color: var(--onyx-color-base-primary-600);
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

.ripple-enter-active {
  transition-property: all;
  transition-timing-function: ease;
  transition-duration: v-bind("config.duration");
}

.ripple-leave-active {
  transition-property: all;
  transition-timing-function: ease;
  transition-duration: v-bind("config.durationLeave");
}

.ripple-enter-from {
  scale: 0;
}

.ripple-leave-to {
  opacity: 0;
}
</style>
