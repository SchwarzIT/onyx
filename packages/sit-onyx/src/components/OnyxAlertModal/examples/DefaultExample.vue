<script lang="ts" setup>
import circleAttention from "@sit-onyx/icons/circle-attention.svg?raw";
import { ref } from "vue";
import { OnyxAlertModal, OnyxButton } from "../../../index.js";

const isOpen = ref(false);
</script>

<template>
  <div>
    <OnyxButton label="Show alert modal" @click="isOpen = true" />

    <OnyxAlertModal
      :icon="{ icon: circleAttention, color: 'danger' }"
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
