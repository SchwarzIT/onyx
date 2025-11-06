<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import type { OnyxGlobalSearchGroupProps } from "./types";

const props = defineProps<OnyxGlobalSearchGroupProps>();

const slots = defineSlots<{
  /**
   * Group options. Should only use `OnyxGlobalSearchOption` components here.
   */
  default?(): unknown;
}>();

const { densityClass } = useDensity(props);
</script>

<template>
  <section :class="['onyx-component', 'onyx-global-search-group', densityClass]">
    <OnyxHeadline is="h4" class="onyx-global-search-group__headline">
      {{ props.label }}
    </OnyxHeadline>

    <ul v-if="slots.default" class="onyx-global-search-group__list">
      <slot></slot>
    </ul>
  </section>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-global-search-group {
  @include layers.component() {
    padding: var(--onyx-density-md);

    &:last-of-type:not(:only-child) {
      border-top: var(--onyx-global-search-border);
    }

    &__headline {
      color: var(--onyx-color-text-icons-neutral-soft);
    }

    &__list {
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-3xs);
    }
  }
}
</style>
