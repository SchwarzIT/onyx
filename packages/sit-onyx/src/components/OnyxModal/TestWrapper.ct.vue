<script lang="ts" setup>
import type { Nullable } from "../../types/utils.js";
import type { DialogAlignment } from "../OnyxBasicDialog/types.js";
import OnyxModal from "./OnyxModal.vue";

const props = defineProps<{
  /** Dialog alignment */
  alignment?: DialogAlignment;
}>();

defineSlots<{
  default?(): unknown;
  headline?(): unknown;
  footer?(): unknown;
}>();

const emit = defineEmits<{
  "update:open": [open: Nullable<boolean>];
}>();
</script>

<template>
  <OnyxModal
    label="Example modal dialog"
    :alignment="props.alignment"
    :open="true"
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

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="scss" scoped>
.content {
  padding: var(--onyx-density-xl) var(--onyx-modal-padding-inline);
}
</style>
