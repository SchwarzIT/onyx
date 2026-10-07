<script lang="ts" setup>
import { iconCircleAttention } from "@sit-onyx/icons";
import { OnyxAlertModal, OnyxButton } from "sit-onyx";
import { ref } from "vue";

const isOpen = ref(false);

const handleDelete = () => {
  // your delete logic here...
  isOpen.value = false;
};
</script>

<template>
  <div>
    <OnyxButton label="Show alert" @click="isOpen = true" />

    <OnyxAlertModal
      v-model:open="isOpen"
      label="Confirm deletion"
      :icon="{ icon: iconCircleAttention, color: 'danger' }"
    >
      Are you sure that you want to delete the selected item? This action can NOT be reverted.

      <template #actions>
        <OnyxButton label="Cancel" color="neutral" mode="plain" autofocus @click="isOpen = false" />
        <OnyxButton label="Delete" color="danger" @click="handleDelete" />
      </template>
    </OnyxAlertModal>
  </div>
</template>
