<script lang="ts" setup>
import { useId } from "vue";
import { useDensity } from "../../composables/density.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxTableOfContentsItem from "../OnyxTableOfContentsItem/OnyxTableOfContentsItem.vue";
import type { OnyxTableOfContentsProps } from "./types.js";

const props = defineProps<OnyxTableOfContentsProps>();

const { t } = injectI18n();
const headlineId = useId();

const { densityClass } = useDensity(props);
</script>

<template>
  <nav :class="['onyx-component', 'onyx-toc', densityClass]" :aria-labelledby="headlineId">
    <OnyxHeadline is="h3" :id="headlineId">
      {{ t("tableOfContents.label") }}
    </OnyxHeadline>

    <ul class="onyx-toc__list">
      <OnyxTableOfContentsItem label="Level 1" link="#test" />
      <OnyxTableOfContentsItem label="Level 1" link="#test" />

      <ul class="onyx-toc__list">
        <OnyxTableOfContentsItem label="Level 2" link="#test" :level="2" />
        <OnyxTableOfContentsItem label="Level 2" link="#test" :level="2" />
      </ul>
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

    &__list {
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: var(--onyx-toc-list-gap);
    }
  }
}
</style>
