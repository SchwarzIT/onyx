<script lang="ts" setup>
import { iconMoreVerticalSmall, iconTrash } from "@sit-onyx/icons";
import { OnyxFileCard, OnyxFlyoutMenu, OnyxIconButton, OnyxMenuItem } from "sit-onyx";
</script>

<template>
  <OnyxFileCard filename="example.pdf" size="42MiB" type="application/pdf">
    <template #actions>
      <OnyxFlyoutMenu label="More actions" trigger="click">
        <template #button="{ trigger }">
          <OnyxIconButton
            v-bind="trigger"
            label="Toggle more actions"
            color="neutral"
            :icon="iconMoreVerticalSmall"
          />
        </template>

        <template #options>
          <OnyxMenuItem label="Action 1" />
          <OnyxMenuItem label="Action 2" />
          <OnyxMenuItem label="Action 3" />
        </template>
      </OnyxFlyoutMenu>

      <OnyxIconButton color="danger" :icon="iconTrash" label="Remove file" />
    </template>
  </OnyxFileCard>
</template>
