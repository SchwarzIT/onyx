<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script lang="ts" setup>
import { inject } from "vue";
import { useDensity } from "../../composables/density.js";
import { GLOBAL_SEARCH_INJECTION_KEY } from "../OnyxGlobalSearch/types.js";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import type { OnyxGlobalSearchGroupProps } from "./types.js";

const props = defineProps<OnyxGlobalSearchGroupProps>();

defineSlots<{
  /**
   * Group options. Should only use `OnyxGlobalSearchOption` components here.
   */
  default?(): unknown;
}>();

const { densityClass } = useDensity(props);

const context = inject(GLOBAL_SEARCH_INJECTION_KEY);
</script>

<template>
  <ul
    :class="['onyx-component', 'onyx-global-search-group', densityClass]"
    v-bind="context?.headless.elements.group.value({ label: props.label })"
  >
    <!-- we use aria-hidden here because the list is already labeled via aria-label -->
    <li aria-hidden="true">
      <OnyxHeadline is="h4" class="onyx-global-search-group__headline">
        {{ props.label }}
      </OnyxHeadline>
    </li>

    <slot></slot>
  </ul>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-global-search-group {
  @include layers.component() {
    padding: var(--onyx-density-md);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-3xs);
    list-style: none;

    &:last-of-type:not(:only-child) {
      border-top: var(--onyx-global-search-border);
    }

    &__headline {
      color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
