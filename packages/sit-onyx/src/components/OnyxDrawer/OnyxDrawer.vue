<script lang="ts" setup>
import OnyxModalDialog from "../OnyxModalDialog/OnyxModalDialog.vue";
import type { OnyxDrawerProps } from "./types";

const props = withDefaults(defineProps<OnyxDrawerProps>(), {
  alignment: "left",
});

const emit = defineEmits<{
  /**
   * Emitted when the drawer should be closed.
   */
  close: [];
}>();

const slots = defineSlots<{
  /**
   * Dialog content.
   */
  default(): unknown;
  /**
   * Optional slot to override the headline with custom content.
   * If unset, the `label` property will be shown.
   */
  headline?(bindings: Pick<OnyxDrawerProps, "label">): unknown;
  /**
   * Optional slot to add custom content, e.g. a description to the drawer header (below the headline).
   */
  description?(): unknown;
  /**
   * Optional footer slot to e.g. show action buttons (see OnyxBottomBar component).
   */
  footer?(): unknown;
}>();
</script>

<template>
  <OnyxModalDialog class="onyx-drawer" v-bind="props" @close="emit('close')">
    <template v-if="!!slots.headline" #headline>
      <slot name="headline" :label="props.label"></slot>
    </template>

    <template v-if="!!slots.description" #description>
      <slot name="description"></slot>
    </template>

    <slot></slot>

    <template v-if="!!slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </OnyxModalDialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-drawer {
  @include layers.component() {
    width: 30rem;
  }
}
</style>
