<script lang="ts" setup>
import { provide, ref, useTemplateRef, watch } from "vue";
import { useMoreList } from "../../composables/useMoreList.js";
import type { VueTemplateRefElement } from "../../composables/useResizeObserver.js";
import type { MoreListSlotBindings, OnyxMoreListProps } from "./types.js";

const props = withDefaults(defineProps<OnyxMoreListProps>(), { is: "div" });

const emit = defineEmits<{
  /**
   * Emitted when the number of visible elements changes.
   */
  visibilityChange: [MoreListSlotBindings];
}>();

defineSlots<{
  /**
   * List of components to render. Each child must implement the `useMoreListChild()` composable.
   */
  default(props: { attributes: object }): unknown;
  /**
   * Slot to display at the end if not all default slot elements fit in the available width.
   */
  more(props: MoreListSlotBindings & { attributes: object }): unknown;
}>();

const parentRef = useTemplateRef<HTMLElement>("parentRefEl");
const listRef = ref<VueTemplateRefElement>();
const moreIndicatorRef = ref<VueTemplateRefElement>();

const more = useMoreList({ parentRef, listRef, moreIndicatorRef });

// eslint-disable-next-line vue/no-setup-props-reactivity-loss -- provide does not support reactive symbols, this reactivity loss is mentioned in the property docs
provide(props.injectionKey, more);

watch(
  [() => more.visibleElements.value?.length, () => more.hiddenElements.value?.length],
  ([visibleElements, hiddenElements]) => {
    emit("visibilityChange", { visibleElements, hiddenElements });
  },
);
</script>

<template>
  <component :is="props.is" ref="parentRefEl" class="onyx-component onyx-more-list">
    <slot
      :attributes="{
        ref: (el?: VueTemplateRefElement) => (listRef = el),
        class: 'onyx-more-list__elements',
      }"
    ></slot>

    <slot
      v-if="more.hiddenElements.value?.length"
      name="more"
      :attributes="{
        ref: (el?: VueTemplateRefElement) => (moreIndicatorRef = el),
        class: 'onyx-more-list__indicator',
      }"
      :hidden-elements="more.hiddenElements.value?.length"
      :visible-elements="more.visibleElements.value?.length"
    ></slot>
  </component>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-more-list {
  @include layers.component() {
    display: flex;
    align-items: center;
    gap: var(--onyx-spacing-4xs);
    contain: inline-size;
    width: 100%;

    &__elements {
      display: inherit;
      align-items: inherit;
      gap: inherit;
      overflow-x: clip;
    }

    &__indicator {
      min-width: max-content;
      max-width: 100%;
    }
  }
}
</style>
