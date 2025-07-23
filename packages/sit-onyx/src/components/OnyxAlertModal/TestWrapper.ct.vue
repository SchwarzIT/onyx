<script lang="ts" setup>
import { iconCircleAttention } from "@sit-onyx/icons";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxAlertModal from "./OnyxAlertModal.vue";

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <OnyxAlertModal
    label="Confirm deletion"
    :icon="{ icon: iconCircleAttention, color: 'danger' }"
    open
    @close="emit('close')"
  >
    Are you sure that you want to delete the selected item? This action can not be reverted.

    <template #actions>
      <OnyxButton label="Cancel" color="neutral" autofocus />
      <OnyxButton label="Delete" color="danger" />
    </template>
  </OnyxAlertModal>
</template>
