<!-- Currently slot props are not supported by Playwright, so we need to provide a custom wrapper. See issue: https://github.com/microsoft/playwright/issues/18758 -->
<script lang="ts" setup>
import OnyxMenuItem from "../OnyxMenuItem/OnyxMenuItem.vue";
import OnyxFlyoutMenu from "./OnyxFlyoutMenu.vue";
import type { OnyxFlyoutMenuProps } from "./types.js";

const props = defineProps<OnyxFlyoutMenuProps>();
</script>

<template>
  <OnyxFlyoutMenu v-bind="props">
    <template #button="{ trigger: _trigger }">
      <button type="button" v-bind="_trigger">Trigger</button>
    </template>

    <template #options>
      <OnyxMenuItem label="Item 1">
        <template #children>
          <OnyxMenuItem label="Item 1.1">
            <template #children>
              <OnyxMenuItem label="Nested 1.1.1" />
              <OnyxMenuItem label="Nested 1.1.2" />
            </template>
          </OnyxMenuItem>

          <OnyxMenuItem label="Item 1.2">
            <template #children>
              <OnyxMenuItem label="Nested 1.2.1" />
              <OnyxMenuItem label="Nested 1.2.2" />
            </template>
          </OnyxMenuItem>

          <OnyxMenuItem label="Item 1.3" />
        </template>
      </OnyxMenuItem>

      <OnyxMenuItem>Item 2</OnyxMenuItem>
      <OnyxMenuItem>Item 3</OnyxMenuItem>
    </template>
  </OnyxFlyoutMenu>
</template>
