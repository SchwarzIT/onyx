<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import type { OnyxFabItemProps } from "./types";

const props = defineProps<OnyxFabItemProps>();

const { densityClass } = useDensity(props);
</script>

<template>
  <button :class="['onyx-component', 'onyx-fab-item', densityClass, 'onyx-text']" type="button">
    OnyxFabItem.vue works!
  </button>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-fab-item {
  @include layers.component() {
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-inverted);

    // reset button styles
    background: var(--onyx-color-base-neutral-600);
    border: none;
    cursor: pointer;
    padding: var(--onyx-density-sm);

    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: var(--onyx-density-2xs);
    border-radius: var(--onyx-radius-full);
    box-shadow: var(--onyx-shadow-soft-bottom);

    &:hover {
      background: var(--onyx-color-base-neutral-800);
    }

    &:focus-visible {
      outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
    }
  }
}
</style>
