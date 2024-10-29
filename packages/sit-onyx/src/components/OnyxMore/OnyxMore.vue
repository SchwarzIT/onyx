<script lang="ts" setup>
import { provide, reactive, ref, toRef, type Ref } from "vue";
import { useMore, type HTMLOrInstanceRef } from "../../composables/useMore";
import type { OnyxMoreProps } from "./types";

const props = defineProps<OnyxMoreProps>();

defineSlots<{
  /**
   * List of components to render. Each child must implement the `useMoreChild()` composable.
   */
  default(): unknown;
  /**
   * Slot to display at the end if not all default slot elements fit in the available width.
   */
  more(props: typeof more): unknown;
}>();

const parentRef = ref<HTMLOrInstanceRef>();
const componentRefs = reactive(new Map<string, Ref<HTMLOrInstanceRef>>());

const more = useMore({
  parentRef,
  componentRefs,
  disabled: toRef(props, "disabled"),
});

// eslint-disable-next-line vue/no-setup-props-reactivity-loss
provide(props.injectionKey, {
  components: componentRefs,
  visibleComponents: more.visibleElements,
});
</script>

<template>
  <component :is="props.is" ref="parentRef" class="onyx-more">
    <slot></slot>
    <slot v-if="more.hiddenElements.value.length > 0" name="more" v-bind="more"></slot>
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
