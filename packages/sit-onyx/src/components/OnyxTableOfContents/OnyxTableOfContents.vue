<script lang="ts" setup>
import { useId } from "vue";
import { useDensity } from "../../composables/density.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import type { OnyxTableOfContentsProps } from "./types.js";

const props = defineProps<OnyxTableOfContentsProps>();

defineSlots<{
  /**
   * Table of content items. Recommended to use the `OnyxTableOfContentsItem` component here.
   */
  default(): unknown;
}>();

const { t } = injectI18n();
const headlineId = useId();

const { densityClass } = useDensity(props);
</script>

<template>
  <nav :class="['onyx-component', 'onyx-toc', densityClass]" :aria-labelledby="headlineId">
    <OnyxHeadline is="h3" :id="headlineId" class="onyx-truncation-ellipsis">
      {{ t("tableOfContents.label") }}
    </OnyxHeadline>

    <ul>
      <slot></slot>
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

    ul {
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: var(--onyx-toc-list-gap);
    }
  }
}
</style>
