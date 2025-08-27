<script lang="ts" setup>
import { ref } from "vue";
import type { Nullable } from "../../types/utils.js";
import OnyxDialog from "./OnyxDialog.vue";

defineSlots<{
  default?(): unknown;
  headline?(): unknown;
  footer?(): unknown;
}>();

const emit = defineEmits<{
  "update:open": [open: Nullable<boolean>];
}>();
const isOpen = ref(true);
</script>

<template>
  <OnyxDialog
    v-model:open="isOpen"
    label="Example Dialog"
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

<style lang="scss">
.content {
  padding: var(--onyx-density-xl) var(--onyx-modal-padding-inline);
  max-height: 10rem;
  max-width: 20rem;
}
</style>
