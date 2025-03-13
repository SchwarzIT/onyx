<!-- Currently slot props are not supported by Playwright, so we need to provide a custom wrapper. See issue: https://github.com/microsoft/playwright/issues/18758 -->
<script lang="ts" setup>
import OnyxMenuItem from "../OnyxMenuItem/OnyxMenuItem.vue";
import OnyxFlyoutMenu from "./OnyxFlyoutMenu.vue";
</script>

<template>
  <OnyxFlyoutMenu label="test" trigger="click">
    <template #button="{ trigger }">
      <button type="button" v-bind="trigger">button label</button>
    </template>
    <template #header>
      <div data-testid="header-content">header-content</div>
    </template>
    <template #footer>
      <div data-testid="footer-content">footer-content</div>
    </template>
    <template #options>
      <OnyxMenuItem v-for="i in 10" :key="i">Option {{ i }}</OnyxMenuItem>
    </template>
  </OnyxFlyoutMenu>
</template>
