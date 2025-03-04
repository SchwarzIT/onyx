<script lang="ts" setup>
import OnyxModalDialog from "./OnyxModalDialog.vue";
import type { ModalDialogAlignment } from "./types";

const props = defineProps<{
  /** Dialog alignment */
  alignment?: ModalDialogAlignment;
}>();

defineSlots<{
  default?(): unknown;
  headline?(): unknown;
  footer?(): unknown;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <OnyxModalDialog
    label="Example modal dialog"
    :alignment="props.alignment"
    open
    @close="emit('close')"
  >
    <template #headline>
      <slot name="headline"></slot>
    </template>

    <template #description> This is an example description about the dialog. </template>

    <div class="content">
      <slot>Dialog content...</slot>
    </div>

    <template #footer>
      <slot name="footer"></slot>
    </template>
  </OnyxModalDialog>
</template>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="scss" scoped>
.content {
  padding: var(--onyx-density-xl) var(--onyx-modal-dialog-padding-inline);
}
</style>
