<script lang="ts" setup>
import OnyxModal from "../OnyxModal/OnyxModal.vue";
import type { OnyxDrawerProps } from "./types.js";

const props = withDefaults(defineProps<OnyxDrawerProps>(), {
  alignment: "left",
  modal: true,
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
  <OnyxModal class="onyx-drawer" v-bind="props" @close="emit('close')">
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
  </OnyxModal>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-drawer {
  @include layers.component() {
    --onyx-modal-padding-inline: var(--onyx-density-md);
    width: 30rem;

    &:not(:modal) {
      --onyx-basic-dialog-screen-gap: 0;
      --onyx-basic-dialog-border-radius: 0;
      border-top: none;
      border-left: none;
      border-bottom: none;
    }
  }
}
</style>
