<script lang="ts" setup>
import circleAttention from "@sit-onyx/icons/circle-attention.svg?raw";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxAlertDialog from "./OnyxAlertDialog.vue";

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <OnyxAlertDialog
    label="Confirm deletion"
    :icon="{ icon: circleAttention, color: 'danger' }"
    open
    @close="emit('close')"
  >
    Are you sure that you want to delete the selected item? This action can not be reverted.

    <template #actions>
      <OnyxButton label="Cancel" color="neutral" autofocus />
      <OnyxButton label="Delete" color="danger" />
    </template>
  </OnyxAlertDialog>
</template>
