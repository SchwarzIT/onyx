<script lang="ts" setup>
import { iconEdit, iconExpandWindow, iconTrash } from "@sit-onyx/icons";
import { OnyxFlyoutMenu, OnyxMenuItem } from "sit-onyx";
import { ref } from "vue";

// you can control the open state if needed
// otherwise the ref can be removed so its managed by the OnyxFlyoutMenu internally
const open = ref(true);

const handleClick = () => {
  // your logic here...
};
</script>

<template>
  <OnyxFlyoutMenu v-model:open="open" label="Actions">
    <template #options>
      <OnyxMenuItem label="Open" :icon="iconExpandWindow" link="#" />
      <OnyxMenuItem label="Edit" :icon="iconEdit" @click="handleClick" />
      <OnyxMenuItem label="Delete" :icon="iconTrash" color="danger" @click="handleClick" />
    </template>
  </OnyxFlyoutMenu>
</template>
