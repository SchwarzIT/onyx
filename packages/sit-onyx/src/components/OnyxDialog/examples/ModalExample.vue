<script lang="ts" setup>
import { ref } from "vue";
import { OnyxButton, OnyxDialog } from "../../../";

const isOpen = ref(false);
</script>

<template>
  <div>
    <OnyxButton label="Open modal" @click="isOpen = true" />

    <OnyxDialog label="Example modal dialog" :open="isOpen" modal @close="isOpen = false">
      Dialog content...
    </OnyxDialog>
  </div>
</template>
