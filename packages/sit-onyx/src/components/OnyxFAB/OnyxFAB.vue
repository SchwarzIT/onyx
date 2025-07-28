<script lang="ts" setup>
import moreHorizontalSmall from "@sit-onyx/icons/more-horizontal-small.svg?raw";
import x from "@sit-onyx/icons/x.svg?raw";
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import type { Nullable } from "../../types/index.js";
import { mergeVueProps } from "../../utils/attrs.js";
import OnyxFABButton from "../OnyxFABButton/OnyxFABButton.vue";
import OnyxFlyoutMenu from "../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import type { OnyxFABProps } from "./types.js";

const props = withDefaults(defineProps<OnyxFABProps>(), {
  alignment: "right",
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the isExpanded state changes.
   */
  "update:open": [value?: Nullable<boolean>];
}>();

const slots = defineSlots<{
  /**
   * Nested options to show inside a flyout.
   */
  default?(): unknown;
}>();

const { densityClass } = useDensity(props);
const skeleton = useSkeletonContext(props);

/**
 * If the flyout is expanded or not.
 */
const isExpanded = useVModel({
  props,
  emit,
  key: "open",
  default: false,
});

const hasOptions = computed(() => !!slots.default);

const triggerIcon = computed(() => {
  if (!hasOptions.value) return props.icon;
  return isExpanded.value ? x : moreHorizontalSmall;
});
</script>

<template>
  <OnyxFABButton
    v-if="!hasOptions || skeleton"
    class="onyx-fab"
    v-bind="props"
    :icon="triggerIcon"
    :skeleton
  />

  <OnyxFlyoutMenu
    v-else
    v-model:open="isExpanded"
    :label="props.label"
    trigger="click"
    :class="['onyx-fab', densityClass]"
    :alignment="props.alignment"
  >
    <template #button="{ trigger }">
      <OnyxFABButton
        v-bind="mergeVueProps(props, trigger)"
        :label="props.label"
        hide-label
        :icon="triggerIcon"
      />
    </template>

    <template #options>
      <slot name="default"></slot>
    </template>
  </OnyxFlyoutMenu>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-fab {
  @include layers.component() {
    --onyx-fab-viewport-gap: var(--onyx-density-sm);
    --onyx-basic-popover-gap: var(--onyx-density-sm);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-inverted);
    position: fixed;
    bottom: var(--onyx-fab-viewport-gap);
    right: var(--onyx-fab-viewport-gap);
    z-index: var(--onyx-z-index-notification);

    &:has(.onyx-basic-popover__dialog--alignment-left) {
      right: unset;
      left: var(--onyx-fab-viewport-gap);

      .onyx-flyout-menu__wrapper {
        align-items: flex-start;
      }
    }

    .onyx-flyout-menu__list-header,
    .onyx-flyout-menu__list-footer {
      display: none;
    }

    .onyx-flyout-menu__wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-2xs);
      align-items: flex-end;
    }

    .onyx-basic-popover__dialog {
      --onyx-basic-popover-min-width: 0;
      box-shadow: none;
      background-color: transparent;
      outline: none;
      width: calc(1.5rem + 2 * var(--onyx-density-md)); // density-md = fab button padding

      &:not(:has(.onyx-fab-button__label)) {
        .onyx-flyout-menu__wrapper {
          align-items: center;
        }
      }
    }

    .onyx-basic-popover__dialog,
    .onyx-flyout-menu__wrapper {
      // prevent cutting of the options outline and box shadow
      // since the floating action button is always positioned at the bottom corner and should
      // not have too many options, we assume that not scrolling when overflowing is acceptable.
      overflow: visible;
    }
  }
}
</style>
