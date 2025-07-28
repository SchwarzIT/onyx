<script lang="ts" setup>
import { ref } from "vue";
import { OnyxButton, OnyxSupportDialog } from "../../../index.js";

const isOpen = ref(false);
</script>

<template>
  <div>
    <OnyxButton label="Open modal" @click="isOpen = true" />

    <OnyxSupportDialog
      label="Example modal dialog"
      :open="isOpen"
      alignment="left"
      modal
      @close="isOpen = false"
    >
      Dialog content...
    </OnyxSupportDialog>
  </div>
</template>
