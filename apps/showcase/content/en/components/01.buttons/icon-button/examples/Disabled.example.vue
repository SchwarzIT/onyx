<script lang="ts" setup>
import { iconDisc, iconTrash, iconX } from "@sit-onyx/icons";
import { OnyxIconButton } from "sit-onyx";
</script>

<template>
  <OnyxIconButton label="Save" :icon="iconDisc" disabled />
  <OnyxIconButton label="Cancel" :icon="iconX" color="neutral" disabled />
  <OnyxIconButton label="Delete" :icon="iconTrash" color="danger" disabled />
</template>
