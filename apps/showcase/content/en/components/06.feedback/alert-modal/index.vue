<script lang="ts" setup>
import { iconCircleAttention } from "@sit-onyx/icons";
import { OnyxAlertModal, OnyxButton } from "sit-onyx";
</script>

<template>
  <!-- modal="false" is important so the dialog can be placed inside the overview card instead of above the while viewport -->
  <OnyxAlertModal
    label="Confirm deletion"
    :icon="{ icon: iconCircleAttention, color: 'danger' }"
    :modal="false"
    open
  >
    Are you sure that you want to delete the selected item? This action can NOT be reverted.

    <template #actions>
      <OnyxButton label="Cancel" color="neutral" mode="plain" />
      <OnyxButton label="Delete" color="danger" />
    </template>
  </OnyxAlertModal>
</template>

<style lang="scss" scoped>
.onyx-alert-modal {
  zoom: 0.5;
}
</style>
