<script lang="ts" setup>
import type { Nullable } from "../../types/utils.js";
import type { DialogAlignment } from "../OnyxBasicDialog/types.js";
import OnyxDialog from "./OnyxDialog.vue";

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
  <OnyxDialog
    label="Example Dialog"
    :alignment="props.alignment"
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
  </OnyxDialog>
</template>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="scss" scoped>
.content {
  padding: var(--onyx-density-xl) var(--onyx-modal-padding-inline);
}
</style>
