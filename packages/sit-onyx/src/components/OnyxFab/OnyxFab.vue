<script lang="ts" setup>
import moreHorizontalSmall from "@sit-onyx/icons/more-horizontal-small.svg?raw";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import x from "@sit-onyx/icons/x.svg?raw";
import { computed, ref } from "vue";
import { useDensity } from "../../composables/density";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxFlyoutMenu from "../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import type { OnyxFabProps } from "./types";

const props = withDefaults(defineProps<OnyxFabProps>(), {
  alignment: "auto",
});

const slots = defineSlots<{
  /**
   * Nested options to show inside a flyout.
   */
  options?(): unknown;
}>();

const { densityClass } = useDensity(props);

const isExpanded = ref(false);

const triggerIcon = computed(() => {
  if (!slots.options) return props.icon;
  if (isExpanded.value) return props.hideLabel ? x : xSmall;
  return moreHorizontalSmall;
});
</script>

<template>
  <OnyxFlyoutMenu
    v-model:open="isExpanded"
    :label="props.label"
    trigger="click"
    :class="['onyx-fab', densityClass]"
    :alignment="props.alignment"
  >
    <template #button="{ trigger }">
      <button
        v-bind="trigger"
        class="onyx-fab__trigger"
        type="button"
        :title="props.hideLabel ? props.label : undefined"
        :aria-label="props.label"
      >
        <OnyxIcon v-if="triggerIcon" :icon="triggerIcon" />
        <template v-if="!props.hideLabel">{{ props.label }}</template>
      </button>
    </template>

    <template #options>
      <slot name="options"></slot>
    </template>
  </OnyxFlyoutMenu>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-fab {
  @include layers.component() {
    --onyx-popover-gap: var(--onyx-density-sm);
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
      width: max-content;
      max-width: 100%;

      &:hover {
        background: var(--onyx-color-base-neutral-500);
      }

      &:focus-visible {
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
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
    }
  }
}
</style>
