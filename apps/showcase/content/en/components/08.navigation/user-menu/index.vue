<script lang="ts" setup>
import { iconLogout, iconSettings } from "@sit-onyx/icons";
import { OnyxMenuItem, OnyxUserMenu } from "sit-onyx";
import { version } from "sit-onyx/package.json";
</script>

<template>
  <OnyxUserMenu
    full-name="Jane Doe"
    description="Description"
    position="top"
    alignment="left"
    flyout-open
  >
    <OnyxMenuItem label="Settings" :icon="iconSettings" link="/settings" />
    <OnyxMenuItem label="Logout" :icon="iconLogout" color="danger" />

    <template #footer>
      App version
      <span class="onyx-text--monospace">{{ version }}</span>
    </template>
  </OnyxUserMenu>
</template>

<style lang="scss" scoped>
.onyx-user-menu {
  align-self: flex-end;
  zoom: 0.5;
}
</style>
