<script lang="ts" setup>
import { createMenuButton } from "@sit-onyx/headless";
import moreHorizontalSmall from "@sit-onyx/icons/more-horizontal-small.svg?raw";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import x from "@sit-onyx/icons/x.svg?raw";
import { computed, ref } from "vue";
import { useDensity } from "../../composables/density";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxFabProps } from "./types";

const props = withDefaults(defineProps<OnyxFabProps>(), {
  trigger: "click",
});

const slots = defineSlots<{
  /**
   * Nested options to show inside a flyout.
   */
  options?(): unknown;
}>();

const { densityClass } = useDensity(props);

const isExpanded = ref(false);
const onToggle = () => (isExpanded.value = !isExpanded.value);

const {
  elements: { root, button, menu },
} = createMenuButton({
  isExpanded,
  onToggle,
  trigger: "click",
});

const triggerIcon = computed(() => {
  if (!slots.options) return props.icon;
  if (isExpanded.value) return props.hideLabel ? x : xSmall;
  return moreHorizontalSmall;
});
</script>

<template>
  <div :class="['onyx-component', 'onyx-fab', densityClass, 'onyx-text']" v-bind="root">
    <button
      class="onyx-fab__trigger"
      v-bind="button"
      type="button"
      :title="props.hideLabel ? props.label : undefined"
      :aria-label="props.label"
    >
      <OnyxIcon v-if="triggerIcon" :icon="triggerIcon" />
      <template v-if="!props.hideLabel">{{ props.label }}</template>
    </button>

    <ul v-if="slots.options" v-show="isExpanded" v-bind="menu">
      <slot name="options"></slot>
    </ul>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-fab {
  @include layers.component() {
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-inverted);

    &__trigger {
      // reset button styles
      background: var(--onyx-color-base-neutral-800);
      border: none;
      cursor: pointer;
      font: inherit;
      color: inherit;
      padding: var(--onyx-density-md);

      display: inline-flex;
      justify-content: center;
      align-items: center;
      gap: var(--onyx-density-xs);
      border-radius: var(--onyx-radius-full);
      box-shadow: var(--onyx-shadow-soft-bottom);

      &:hover {
        background: var(--onyx-color-base-neutral-500);
      }

      &:focus-visible {
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
      }
    }
  }
}
</style>
