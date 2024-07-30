<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRipple, type RippleConfig } from "../../composables/useRipple";
import { type OnyxRippleProps } from "./types";

const props = withDefaults(defineProps<OnyxRippleProps>(), {
  enterDuration: "300ms",
  leaveDuration: "100ms",
  color: "var(--onyx-ripple-color, var(--onyx-color-base-primary-600))",
  terminateOnPointerUp: false,
});

const rippleTrigger = ref<HTMLElement>();

const config = computed<RippleConfig>(() => ({
  color: props.color,
  container: rippleTrigger,
  terminateOnPointerUp: props.terminateOnPointerUp,
}));

const { ripples, hideRipple, events } = useRipple(config);
</script>

<template>
  <span ref="rippleTrigger" class="onyx-ripple" v-on="events">
    <transition-group name="onyx-ripple" @after-enter="hideRipple($event as HTMLElement)">
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
  transition-duration: v-bind("props.enterDuration");
  @media (prefers-reduced-motion) {
    transition-duration: 1ms;
  }
}

.onyx-ripple-leave-active {
  transition-duration: v-bind("props.leaveDuration");
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
