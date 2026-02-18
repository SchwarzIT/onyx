<script lang="ts" setup>
import { mergeVueProps, OnyxSystemButton, OnyxTooltip, useForwardProps } from "sit-onyx";
import type { OnyxEditorToolbarActionProps } from "./types.js";

const props = defineProps<OnyxEditorToolbarActionProps>();

defineSlots<{
  /**
   * Optional slot to override the button content.
   */
  default?(): unknown;
}>();

const systemButtonProps = useForwardProps(props, OnyxSystemButton);
</script>

<template>
  <OnyxTooltip class="onyx-editor-toolbar-action" :text="props.label" position="top">
    <template #default="{ trigger }">
      <!-- empty title is used to hide the native browser tooltip since we provide a custom tooltip here -->
      <OnyxSystemButton
        v-bind="mergeVueProps(systemButtonProps, trigger)"
        :class="{ active: props.active }"
        title=""
      >
        <slot></slot>
      </OnyxSystemButton>
    </template>
  </OnyxTooltip>
</template>

<style lang="scss">
@use "sit-onyx/src/styles/mixins/layers.scss";

.onyx-editor-toolbar-action {
  @include layers.component() {
    display: flex;
  }

  @include layers.override() {
    .onyx-system-button {
      &.active {
        --color: var(--onyx-color-text-icons-primary-intense);
        --hover-background-color: var(--onyx-color-base-primary-200);
        --focus-active-background-color: var(--onyx-color-base-primary-200);
      }
    }
  }
}
</style>
