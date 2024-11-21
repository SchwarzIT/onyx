<script lang="ts" setup>
import { provide, reactive, ref, toRef, watch, type Ref } from "vue";
import { useMoreList, type HTMLOrInstanceRef } from "../../composables/useMoreList";
import { useResizeObserver } from "../../composables/useResizeObserver";
import type { MoreListSlotBindings, OnyxMoreListProps } from "./types";

const props = defineProps<OnyxMoreListProps>();

const emit = defineEmits<{
  /**
   * Emitted when the number of visible elements changes.
   */
  visibilityChange: [MoreListSlotBindings];
}>();

defineSlots<{
  /**
   * List of components to render. Each child must implement the `useMoreChild()` composable.
   */
  default(): unknown;
  /**
   * Slot to display at the end if not all default slot elements fit in the available width.
   */
  more(props: MoreListSlotBindings): unknown;
}>();

const parentRef = ref<HTMLOrInstanceRef>();
const componentRefs = reactive(new Map<string, Ref<HTMLOrInstanceRef>>());
const disabled = toRef(props, "disabled");

const more = useMoreList({ parentRef, componentRefs, disabled });
const { width } = useResizeObserver();

// eslint-disable-next-line vue/no-setup-props-reactivity-loss -- provide does not support reactive symbols, this reactivity loss is mentioned in the property docs
provide(props.injectionKey, {
  components: componentRefs,
  visibleElements: more.visibleElements,
  disabled,
  width,
});

watch([more.visibleElements, more.hiddenElements], ([visibleElements, hiddenElements]) => {
  emit("visibilityChange", {
    visibleElements: visibleElements?.length ?? 0,
    hiddenElements: hiddenElements.length,
  });
});
</script>

<template>
  <component :is="props.is" class="onyx-more-list">
    <component :is="props.is" ref="parentRef" class="onyx-more-list__elements">
      <slot></slot>
    </component>

    <component
      :is="props.is"
      v-if="more.hiddenElements.value.length > 0"
      class="onyx-more-list__indicator"
    >
      <slot
        name="more"
        :hidden-elements="more.hiddenElements.value.length"
        :visible-elements="more.visibleElements.value?.length ?? 0"
      ></slot>
    </component>
  </component>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-more-list {
  @include layers.component() {
    display: flex;
    align-items: center;
    gap: var(--onyx-spacing-4xs);

    &__elements {
      display: inherit;
      align-items: inherit;
      gap: inherit;
      overflow-x: hidden;
    }

    &__indicator {
      min-width: max-content;
      max-width: 100%;

      > * {
        visibility: visible !important;
      }
    }
  }
}
</style>
