<script lang="ts" setup>
import type { MDCParserResult } from "@nuxtjs/mdc";
import { parseMarkdown } from "@nuxtjs/mdc/runtime";
import MDCRenderer from "@nuxtjs/mdc/runtime/components/MDCRenderer.vue";
import { useDensity } from "sit-onyx";
import { ref, watch } from "vue";
import { proseComponents } from "../prose/prose.js";
import type { OnyxMarkdownRendererProps } from "./types.js";

const props = defineProps<OnyxMarkdownRendererProps>();

defineSlots<{
  /**
   * Slot to display while parsing/loading the markdown.
   */
  loading?(): unknown;
}>();

const { densityClass } = useDensity(props);

const isLoading = ref(false);
const parserResult = ref<MDCParserResult>();

watch(
  () => props.markdown,
  async () => {
    isLoading.value = true;
    try {
      parserResult.value = await parseMarkdown(props.markdown);
    } finally {
      isLoading.value = false;
    }
  },
  { immediate: true },
);
</script>

<template>
  <Suspense>
    <slot v-if="isLoading" name="loading"></slot>

    <MDCRenderer
      v-else-if="parserResult"
      :class="['onyx-component', 'onyx-markdown-renderer', densityClass]"
      :body="parserResult.body"
      :data="parserResult.data"
      :components="proseComponents"
    />

    <template #fallback>
      <slot name="loading"></slot>
    </template>
  </Suspense>
</template>

<style lang="scss">
@use "sit-onyx/src/styles/mixins/layers.scss";

.onyx-markdown-renderer {
  @include layers.component() {
    --onyx-markdown-renderer-margin-block: var(--onyx-density-md);
    font-family: var(--onyx-font-family-paragraph);
  }
}
</style>
