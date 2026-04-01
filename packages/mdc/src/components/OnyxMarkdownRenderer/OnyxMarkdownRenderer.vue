<script lang="ts" setup>
import type { MDCParserResult } from "@nuxtjs/mdc";
import { useDensity } from "sit-onyx";
import { defineAsyncComponent, ref, useAttrs, watch } from "vue";
import ProseA from "../prose/ProseA.vue";
import ProseBr from "../prose/ProseBr.vue";
import ProseCode from "../prose/ProseCode.vue";
import ProseDetails from "../prose/ProseDetails.vue";
import ProseH1 from "../prose/ProseH1.vue";
import ProseH2 from "../prose/ProseH2.vue";
import ProseH3 from "../prose/ProseH3.vue";
import ProseH4 from "../prose/ProseH4.vue";
import ProseH5 from "../prose/ProseH5.vue";
import ProseH6 from "../prose/ProseH6.vue";
import ProseHr from "../prose/ProseHr.vue";
import ProseOl from "../prose/ProseOl.vue";
import ProseP from "../prose/ProseP.vue";
import ProsePre from "../prose/ProsePre.vue";
import ProseSummary from "../prose/ProseSummary.vue";
import ProseTable from "../prose/ProseTable.vue";
import ProseTbody from "../prose/ProseTbody.vue";
import ProseThead from "../prose/ProseThead.vue";
import ProseUl from "../prose/ProseUl.vue";
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

// dynamic imports are needed due to conflicts when used within Nuxt
const getParser = async () => {
  const { parseMarkdown } = await import("@nuxtjs/mdc/runtime");
  return parseMarkdown;
};

const MDCRenderer = defineAsyncComponent(
  () => import("@nuxtjs/mdc/runtime/components/MDCRenderer.vue"),
);

watch(
  () => props.markdown,
  async () => {
    isLoading.value = true;
    try {
      const parseMarkdown = await getParser();
      parserResult.value = await parseMarkdown(props.markdown, props.options);
    } finally {
      isLoading.value = false;
    }
  },
  { immediate: true },
);

const components = {
  a: ProseA,
  br: ProseBr,
  code: ProseCode,
  details: ProseDetails,
  h1: ProseH1,
  h2: ProseH2,
  h3: ProseH3,
  h4: ProseH4,
  h5: ProseH5,
  h6: ProseH6,
  hr: ProseHr,
  ol: ProseOl,
  p: ProseP,
  pre: ProsePre,
  summary: ProseSummary,
  table: ProseTable,
  thead: ProseThead,
  tbody: ProseTbody,
  ul: ProseUl,
};

const attrs = useAttrs();

defineExpose({ parserResult });
</script>

<template>
  <Suspense>
    <slot v-if="isLoading" name="loading"></slot>

    <MDCRenderer
      v-else-if="parserResult"
      v-bind="attrs"
      :class="['onyx-component', 'onyx-markdown-renderer', densityClass]"
      :body="parserResult.body"
      :data="parserResult.data"
      :components
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
    font-family: var(--onyx-font-family-paragraph);
  }
}
</style>
