<!-- Currently slot props are not supported by Playwright, so we need to provide a custom wrapper. See issue: https://github.com/microsoft/playwright/issues/18758 -->
<script lang="ts" setup>
import OnyxColorSchemeMenuItem from "../OnyxColorSchemeMenuItem/OnyxColorSchemeMenuItem.vue";
import OnyxMenuItem from "../OnyxMenuItem/OnyxMenuItem.vue";
import OnyxFlyoutMenu from "./OnyxFlyoutMenu.vue";
import type { OnyxFlyoutMenuProps } from "./types";

const props = defineProps<OnyxFlyoutMenuProps>();

defineSlots<{
  options?(): unknown;
}>();
</script>

<template>
  <OnyxFlyoutMenu v-bind="props">
    <template #button="{ trigger: _trigger }">
      <button type="button" v-bind="_trigger" tabindex="0">button label</button>
    </template>
    <template #options>
      <OnyxMenuItem active>English</OnyxMenuItem>
      <OnyxMenuItem>German</OnyxMenuItem>
      <OnyxMenuItem>Spanish</OnyxMenuItem>
      <OnyxColorSchemeMenuItem model-value="auto" />
    </template>
  </OnyxFlyoutMenu>
</template>
