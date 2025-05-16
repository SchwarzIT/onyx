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
    <template #button="{ trigger: _trigger, disabled: _disabled }">
      <button type="button" v-bind="_trigger" :disabled="_disabled">button label</button>
    </template>
    <template #options="{ disabled: _disabled }">
      <OnyxMenuItem active :disabled="_disabled">English</OnyxMenuItem>
      <OnyxMenuItem :disabled="_disabled">German</OnyxMenuItem>
      <OnyxMenuItem :disabled="_disabled">Spanish</OnyxMenuItem>
      <OnyxColorSchemeMenuItem model-value="auto" :disabled="_disabled" />
    </template>
  </OnyxFlyoutMenu>
</template>
