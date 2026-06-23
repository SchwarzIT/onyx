<script lang="ts" setup>
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
import { computed, inject } from "vue";
import { useDensity } from "../../composables/density.js";
import OnyxFilterBadge from "../OnyxFilterBadge/OnyxFilterBadge.vue";
import { GLOBAL_SEARCH_INJECTION_KEY } from "../OnyxGlobalSearch/types.js";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import type { OnyxGlobalSearchFilterGroupProps } from "./types.js";

const props = defineProps<OnyxGlobalSearchFilterGroupProps>();

defineSlots<{
  /**
   * Group filters. Should only use `OnyxGlobalSearchOption` components here.
   */
  default?(): unknown;
}>();

const { densityClass } = useDensity(props);

const context = inject(GLOBAL_SEARCH_INJECTION_KEY, undefined);

const skeletonCount = computed(() => {
  if (!props.skeleton) return 0;
  return typeof props.skeleton === "number" ? props.skeleton : 3;
});
</script>

<template>
  <div
    :class="['onyx-component', 'onyx-global-search-group', densityClass]"
    v-bind="context?.headless.elements.group.value({ label: props.label })"
  >
    <!-- we use aria-hidden here because the list is already labeled via aria-label -->
    <li aria-hidden="true">
      <OnyxHeadline is="h4" class="onyx-global-search-group__headline">
        {{ props.label }}
      </OnyxHeadline>
    </li>

    <div class="onyx-global-search-group__filters">
      <template v-if="skeletonCount <= 0">
        <slot></slot>
      </template>
      <template v-else>
        <OnyxFilterBadge
          v-for="i in skeletonCount"
          :key="`skeleton-${i}`"
          :label="`Skeleton ${i}`"
          :value="`skeleton-${i}`"
          skeleton
        />
      </template>
    </div>

    <!-- TODO: implement empty state -->
  </div>
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

    &:not(:first-of-type) {
      border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    }

    &__headline {
      color: var(--onyx-color-text-icons-neutral-soft);
    }
    &__filters {
      display: flex;
      flex-wrap: wrap;
      gap: var(--onyx-density-2xs);
    }
  }
}
</style>
