<script lang="ts" setup>
import { iconCircleAttention } from "@sit-onyx/icons";
import { useForwardProps } from "../../utils/props.js";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxAlertModal from "./OnyxAlertModal.vue";
import type { OnyxAlertModalProps } from "./types.js";

const props = defineProps<Pick<OnyxAlertModalProps, "nonDismissible">>();

const emit = defineEmits<{
  "update:open": [open: boolean];
}>();

const alertProps = useForwardProps(props, OnyxAlertModal);
</script>

<template>
  <OnyxAlertModal
    v-bind="alertProps"
    label="Confirm deletion"
    :icon="{ icon: iconCircleAttention, color: 'danger' }"
    open
    @update:open="emit('update:open', $event)"
  >
    Are you sure that you want to delete the selected item? This action can not be reverted.

    <template #actions>
      <OnyxButton label="Cancel" color="neutral" autofocus />
      <OnyxButton label="Delete" color="danger" />
    </template>
  </OnyxAlertModal>
</template>
