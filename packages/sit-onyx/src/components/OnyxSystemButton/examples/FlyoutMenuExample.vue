<script lang="ts" setup>
import { iconMoreVertical } from "@sit-onyx/icons";
import { OnyxFlyoutMenu, OnyxMenuItem, OnyxSystemButton } from "../../../index.js";
</script>

<template>
  <OnyxFlyoutMenu label="Actions">
    <template #button="{ trigger }">
      <OnyxSystemButton v-bind="trigger" label="Toggle actions" :icon="iconMoreVertical" />
    </template>

    <template #options>
      <OnyxMenuItem>Action 1</OnyxMenuItem>
      <OnyxMenuItem>Action 2</OnyxMenuItem>
      <OnyxMenuItem>Action 3</OnyxMenuItem>
    </template>
  </OnyxFlyoutMenu>
</template>
