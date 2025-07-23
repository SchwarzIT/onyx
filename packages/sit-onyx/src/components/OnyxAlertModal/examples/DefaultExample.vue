<script lang="ts" setup>
import { iconCircleAttention } from "@sit-onyx/icons";
import { ref } from "vue";
import { OnyxAlertModal, OnyxButton } from "../../../index.js";

const isOpen = ref(false);
</script>

<template>
  <div>
    <OnyxButton label="Show alert modal" @click="isOpen = true" />

    <OnyxAlertModal
      :icon="{ icon: iconCircleAttention, color: 'danger' }"
      label="Confirm deletion"
      :open="isOpen"
      @close="isOpen = false"
    >
      Are you sure that you want to delete the selected item? This action can not be reverted.

      <template #actions>
        <OnyxButton label="Cancel" color="neutral" mode="plain" autofocus @click="isOpen = false" />
        <OnyxButton label="Delete" color="danger" />
      </template>
    </OnyxAlertModal>
  </div>
</template>
