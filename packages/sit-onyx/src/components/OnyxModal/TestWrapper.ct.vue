<script lang="ts" setup>
import { useForwardProps } from "../../utils/props.js";
import OnyxModal from "./OnyxModal.vue";
import type { OnyxModalProps } from "./types.js";

const props = defineProps<Pick<OnyxModalProps, "nonDismissible">>();

defineSlots<{
  default?(): unknown;
  headline?(): unknown;
  footer?(): unknown;
}>();

const emit = defineEmits<{
  "update:open": [open: boolean];
}>();

const modalProps = useForwardProps(props, OnyxModal);
</script>

<template>
  <OnyxModal
    v-bind="modalProps"
    label="Example modal dialog"
    open
    @update:open="emit('update:open', $event)"
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
  </OnyxModal>
</template>

<style lang="scss" scoped>
.content {
  padding: var(--onyx-density-xl) var(--onyx-modal-padding-inline);
}
</style>
