<script lang="ts" setup>
import { mergeVueProps, OnyxSystemButton, OnyxTooltip, useForwardProps } from "sit-onyx";
import type { OnyxEditorToolbarActionProps } from "./types.js";

const props = defineProps<OnyxEditorToolbarActionProps>();

const systemButtonProps = useForwardProps(props, OnyxSystemButton);
</script>

<template>
  <OnyxTooltip class="onyx-editor-toolbar-action" :text="props.label">
    <template #default="{ trigger }">
      <OnyxSystemButton v-bind="mergeVueProps(systemButtonProps, trigger)" />
    </template>
  </OnyxTooltip>
</template>

<style lang="scss">
@use "sit-onyx/src/styles/mixins/layers.scss";

.onyx-editor-toolbar-action {
  @include layers.component() {
    display: flex;
  }
}
</style>
