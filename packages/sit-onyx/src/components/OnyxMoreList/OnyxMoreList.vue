<script lang="ts" setup>
import { provide, reactive, ref, toRef, watch, type Ref } from "vue";
import { useMoreList, type HTMLOrInstanceRef } from "../../composables/useMoreList";
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

const more = useMoreList({
  parentRef,
  componentRefs,
  disabled: toRef(props, "disabled"),
});

// eslint-disable-next-line vue/no-setup-props-reactivity-loss
provide(props.injectionKey, {
  components: componentRefs,
  visibleElements: more.visibleElements,
});

watch([more.visibleElements, more.hiddenElements], ([visibleElements, hiddenElements]) => {
  emit("visibilityChange", {
    visibleElements: visibleElements.length,
    hiddenElements: hiddenElements.length,
  });
});
</script>

<template>
  <component :is="props.is" ref="parentRef" class="onyx-more">
    <slot></slot>
    <slot
      v-if="more.hiddenElements.value.length > 0"
      name="more"
      :hidden-elements="more.hiddenElements.value.length"
      :visible-elements="more.visibleElements.value.length"
    ></slot>
  </component>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-more {
  @include layers.component() {
    display: flex;
    align-items: center;
    gap: var(--onyx-spacing-4xs);
    overflow-x: clip;
  }
}
</style>
