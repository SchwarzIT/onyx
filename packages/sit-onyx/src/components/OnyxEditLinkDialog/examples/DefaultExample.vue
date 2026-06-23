<script setup lang="ts">
import { ref } from "vue";
import { OnyxButton, OnyxUnstableEditLinkDialog } from "../../../index.js";

const isOpen = ref(false);
</script>

<template>
  <OnyxUnstableEditLinkDialog v-model:open="isOpen">
    <template #trigger>
      <OnyxButton label="Edit link" @click="isOpen = true" />
    </template>
  </OnyxUnstableEditLinkDialog>
</template>
