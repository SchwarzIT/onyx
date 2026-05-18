<script lang="ts" setup>
import { iconDisc, iconTrash, iconX } from "@sit-onyx/icons";
import { OnyxIconButton } from "sit-onyx";

const handleClick = () => {
  // your logic here...
};
</script>

<template>
  <OnyxIconButton label="Save" :icon="iconDisc" @click="handleClick" />
  <OnyxIconButton label="Cancel" :icon="iconX" color="neutral" @click="handleClick" />
  <OnyxIconButton label="Delete" :icon="iconTrash" color="danger" @click="handleClick" />
</template>
