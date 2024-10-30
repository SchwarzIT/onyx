<script lang="ts" setup>
import { provide, reactive, ref, toRef, type Ref } from "vue";
import { useMoreList, type HTMLOrInstanceRef } from "../../composables/useMoreList";
import type { OnyxMoreListProps } from "./types";

const props = defineProps<OnyxMoreListProps>();

defineSlots<{
  /**
   * List of components to render. Each child must implement the `useMoreChild()` composable.
   */
  default(): unknown;
  /**
   * Slot to display at the end if not all default slot elements fit in the available width.
   */
  more(props: { hiddenElements: number; visibleElements: number }): unknown;
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
