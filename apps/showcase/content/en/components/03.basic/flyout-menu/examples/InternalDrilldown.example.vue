<script lang="ts" setup>
import { OnyxFlyoutMenu, OnyxMenuItem } from "sit-onyx";
</script>

<template>
  <OnyxFlyoutMenu label="Actions">
    <template #options>
      <OnyxMenuItem label="Item 1">
        <template #children>
          <OnyxMenuItem label="Nested 1.1.1" />

          <OnyxMenuItem label="Nested 1.1.2">
            <template #children>
              <OnyxMenuItem label="Nested 1.2.1" />
              <OnyxMenuItem label="Nested 1.2.2" />
            </template>
          </OnyxMenuItem>
        </template>
      </OnyxMenuItem>

      <OnyxMenuItem label="Item 2" />
      <OnyxMenuItem label="Item 3" />
    </template>
  </OnyxFlyoutMenu>
</template>
