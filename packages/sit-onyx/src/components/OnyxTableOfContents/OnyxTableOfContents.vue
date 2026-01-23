<script lang="ts" setup>
import { computed, useId } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxTableOfContentsItem from "../OnyxTableOfContentsItem/OnyxTableOfContentsItem.vue";
import type { OnyxTableOfContentsProps } from "./types.js";

const props = withDefaults(defineProps<OnyxTableOfContentsProps>(), {
  skeleton: SKELETON_INJECTED_SYMBOL,
});

defineSlots<{
  /**
   * Table of content items. Recommended to use the `OnyxTableOfContentsItem` component here.
   */
  default(): unknown;
}>();

const { t } = injectI18n();
const headlineId = useId();

const { densityClass } = useDensity(props);
const skeleton = useSkeletonContext(props);
const skeletonCount = computed(() => {
  if (!skeleton.value) return 0;
  return typeof skeleton.value === "number" ? skeleton.value : 6;
});
</script>

<template>
  <nav :class="['onyx-component', 'onyx-toc', densityClass]" :aria-labelledby="headlineId">
    <OnyxHeadline is="h3" :id="headlineId" class="onyx-toc__headline onyx-truncation-ellipsis">
      {{ t("tableOfContents.label") }}
    </OnyxHeadline>

    <ul class="onyx-toc__list">
      <template v-if="skeletonCount">
        <OnyxTableOfContentsItem v-for="i in skeletonCount" :key="i" link="#skeleton" skeleton />
      </template>
      <slot v-else></slot>
    </ul>
  </nav>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-toc {
  @include layers.component() {
    --onyx-toc-list-gap: var(--onyx-density-2xs);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-md);

    &__headline {
      // needed due to "onyx-truncation-ellipsis" when both horizontal and vertical size is limited
      // otherwise, the list will overlap the headline
      overflow: clip;
    }

    &__list {
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: var(--onyx-toc-list-gap);
      overflow-y: auto;

      // this "trick" is needed so the outline of items is not cut off due to the overflow-y: auto above
      &:focus-within {
        padding: var(--onyx-outline-width);
        margin: calc(-1 * var(--onyx-outline-width));
      }
    }
  }
}
</style>
