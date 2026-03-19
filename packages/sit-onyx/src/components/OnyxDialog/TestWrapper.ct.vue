<script lang="ts" setup>
import { ref } from "vue";
import { useForwardProps } from "../../utils/props.js";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxDialog from "./OnyxDialog.vue";
import type { OnyxDialogProps } from "./types.js";

const props = defineProps<Pick<OnyxDialogProps, "nonDismissible">>();

defineSlots<{
  default?(): unknown;
  headline?(): unknown;
  footer?(): unknown;
}>();

const emit = defineEmits<{
  "update:open": [open: boolean];
}>();

const isOpen = ref(true);

const dialogProps = useForwardProps(props, OnyxDialog);
</script>

<template>
  <OnyxDialog
    v-bind="dialogProps"
    v-model:open="isOpen"
    label="Example Dialog"
    @update:open="emit('update:open', $event)"
  >
    <template #trigger="{ trigger }">
      <OnyxButton label="Example Dialog" v-bind="trigger" />
    </template>
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
  </OnyxDialog>
</template>

<style lang="scss">
.content {
  padding: var(--onyx-density-xl) var(--onyx-modal-padding-inline);
  max-height: 10rem;
  max-width: 20rem;
}
</style>
