<script lang="ts" setup>
import { ref } from "vue";
import { OnyxBasicDialog, OnyxButton } from "../../../index.js";

const isOpen = ref(false);
</script>

<template>
  <div>
    <OnyxButton label="Open modal" @click="isOpen = true" />

    <OnyxBasicDialog label="Example modal dialog" :open="isOpen" modal @close="isOpen = false">
      Dialog content...
    </OnyxBasicDialog>
  </div>
</template>
