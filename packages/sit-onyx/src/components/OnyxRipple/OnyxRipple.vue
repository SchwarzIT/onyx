<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRipple, type RippleConfig } from "../../composables/useRipple";

const rippleTrigger = ref<HTMLElement>();

const config = computed<RippleConfig>(() => ({
  color: "var(--onyx-ripple-color, var(--onyx-color-base-primary-600))",
  container: rippleTrigger,
}));

const { ripples, hideRipple, events } = useRipple(config);

defineExpose({
  events,
});
</script>

<template>
  <span ref="rippleTrigger" class="onyx-ripple" aria-hidden="true">
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

.onyx-ripple {
  @include layers.component() {
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

    &-enter-active,
    &-leave-active {
      transition-property: opacity, scale;
      transition-timing-function: ease;
      transition-duration: var(--onyx-duration-sm);
      @media (prefers-reduced-motion) {
        transition-duration: 1ms;
      }
    }

    &-leave-active {
      transition-duration: 150ms;
      @media (prefers-reduced-motion) {
        transition-duration: 1ms;
      }
    }

    &-enter-from {
      scale: 0;
    }

    &-leave-to {
      scale: 0;
      opacity: 0;
    }
  }
}
</style>
