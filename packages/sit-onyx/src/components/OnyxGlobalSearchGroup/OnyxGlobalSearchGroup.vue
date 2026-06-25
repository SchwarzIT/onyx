<script lang="ts" setup>
import { computed, inject } from "vue";
import { useDensity } from "../../composables/density.js";
import OnyxFilterBadge from "../OnyxFilterBadge/OnyxFilterBadge.vue";
import { GLOBAL_SEARCH_INJECTION_KEY } from "../OnyxGlobalSearch/types.js";
import OnyxGlobalSearchOption from "../OnyxGlobalSearchOption/OnyxGlobalSearchOption.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import type { OnyxGlobalSearchGroupProps } from "./types.js";

const props = withDefaults(defineProps<OnyxGlobalSearchGroupProps>(), {
  direction: "column",
  is: "li",
});

defineSlots<{
  /**
   * Group items. Should use `OnyxGlobalSearchOption` or `OnyxFilterBadge` components here based on direction.
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
  <component
    :is="props.is === 'li' ? 'ul' : 'div'"
    :class="['onyx-component', 'onyx-global-search-group', densityClass]"
    v-bind="context?.headless.elements.group.value({ label: props.label })"
  >
    <!-- we use aria-hidden here because the list is already labeled via aria-label -->
    <component :is="props.is" aria-hidden="true">
      <OnyxHeadline is="h4" class="onyx-global-search-group__headline">
        {{ props.label }}
      </OnyxHeadline>
    </component>

    <component
      :is="props.is"
      v-if="direction === 'row'"
      class="onyx-global-search-group__content--row"
    >
      <template v-if="skeletonCount <= 0">
        <slot></slot>
      </template>
      <template v-else>
        <OnyxFilterBadge
          v-for="i in skeletonCount"
          :key="`skeleton-badge-${i}`"
          :label="`Skeleton ${i}`"
          :value="`skeleton-${i}`"
          skeleton
        />
      </template>
    </component>

    <template v-else>
      <template v-if="skeletonCount <= 0">
        <slot></slot>
      </template>
      <template v-else>
        <OnyxGlobalSearchOption
          v-for="i in skeletonCount"
          :key="`skeleton-option-${i}`"
          :label="`Skeleton ${i}`"
          :value="`skeleton-${i}`"
          skeleton
        />
      </template>
    </template>

    <!-- TODO: implement empty state -->
  </component>
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

    &__content--row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--onyx-density-2xs);
    }
  }
}
</style>
