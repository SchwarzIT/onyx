<script lang="ts" setup>
import { useSlots } from "vue";

const props = withDefaults(
  defineProps<{
    navBarAlignment: "top" | "left";
  }>(),
  { navBarAlignment: "top" },
);
defineSlots<{
  navBar(props: Record<string, never>): unknown;
  default(props: Record<string, never>): unknown;
  overlay(props: Record<string, never>): unknown;
}>();

const slots = useSlots();
</script>

<template>
  <div class="onyx-app" :class="{ 'onyx-app--horizontal': props.navBarAlignment === 'left' }">
    <nav class="onyx-app__nav">
      <slot name="navBar"></slot>
    </nav>
    <div class="onyx-app__page">
      <slot></slot>
    </div>
    <!-- todo teleport does not work on storybook? -->
    <Teleport v-if="slots.overlay" to="body">
      <div class="onyx-backdrop">
        <slot name="overlay"></slot>
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss">
.onyx-app {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: max-content 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    "nav"
    "page";

  &--horizontal {
    grid-template-rows: 1fr;
    grid-template-columns: max-content 1fr;
    grid-template-areas: "nav page";
  }

  &__nav {
    grid-area: nav;
    z-index: var(--onyx-z-index-navigation);
  }
  &__page {
    grid-area: page;
    overflow: hidden auto;
    position: relative;
  }
}

.onyx-backdrop {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: var(--onyx-z-index-overlay);
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
