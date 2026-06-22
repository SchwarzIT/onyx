<script setup lang="ts">
import { ref } from "vue";
import { OnyxButton, OnyxUnstableLinkDialog } from "../../../index.js";

const isOpen = ref(false);
</script>

<template>
  <OnyxUnstableLinkDialog v-model:open="isOpen">
    <template #trigger>
      <OnyxButton label="Dialog öffnen" @click="isOpen = true" />
    </template>
  </OnyxUnstableLinkDialog>
</template>
