<script lang="ts" setup>
import moreHorizontalSmall from "@sit-onyx/icons/more-horizontal-small.svg?raw";
import x from "@sit-onyx/icons/x.svg?raw";
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import { useVModel } from "../../composables/useVModel";
import type { Nullable } from "../../types";
import OnyxFabButton from "../OnyxFabButton/OnyxFabButton.vue";
import OnyxFlyoutMenu from "../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import type { OnyxFabProps } from "./types";

const props = withDefaults(defineProps<OnyxFabProps>(), {
  alignment: "right",
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
  options?(): unknown;
}>();

const { densityClass } = useDensity(props);

/**
 * If the flyout is expanded or not.
 */
const isExpanded = useVModel({
  props,
  emit,
  key: "open",
  default: false,
});

const hasOptions = computed(() => !!slots.options);

const triggerIcon = computed(() => {
  if (!hasOptions.value) return props.icon;
  return isExpanded.value ? x : moreHorizontalSmall;
});
</script>

<template>
  <OnyxFlyoutMenu
    v-if="hasOptions"
    v-model:open="isExpanded"
    :label="props.label"
    trigger="click"
    :class="['onyx-fab', densityClass]"
    :alignment="props.alignment"
  >
    <template #button="{ trigger }">
      <OnyxFabButton v-bind="{ ...props, ...trigger }" :icon="triggerIcon" />
    </template>

    <template #options>
      <slot name="options"></slot>
    </template>
  </OnyxFlyoutMenu>

  <OnyxFabButton v-else class="onyx-fab" v-bind="props" :icon="triggerIcon" />
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-fab {
  @include layers.component() {
    --onyx-fab-viewport-gap: var(--onyx-density-sm);
    --onyx-popover-gap: var(--onyx-density-sm);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-inverted);
    position: fixed;
    bottom: var(--onyx-fab-viewport-gap);
    right: var(--onyx-fab-viewport-gap);

    &:has(.onyx-popover__dialog--alignment-left) {
      right: unset;
      left: var(--onyx-fab-viewport-gap);

      .onyx-flyout-menu__wrapper {
        align-items: flex-start;
      }
    }

    .onyx-popover__dialog {
      box-shadow: none;
      background-color: transparent;
      outline: none;
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
  }
}
</style>
