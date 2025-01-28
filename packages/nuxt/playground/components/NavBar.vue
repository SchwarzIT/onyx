<script lang="ts" setup>
import logout from "@sit-onyx/icons/logout.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
</script>

<template>
  <OnyxNavBar app-name="Nuxt module Playground">
    <OnyxNavButton href="/" label="Item 1" active />
    <OnyxNavButton href="/test" label="Item 2">
      Item 2
      <OnyxBadge color="warning" dot />

      <template #children>
        <OnyxNavItem href="#" label="Nested item 2.1" />
        <OnyxNavItem href="#" label="Nested item 2.2" />
        <OnyxNavItem href="https://onyx.schwarz" label="Nested item 2.3" />
      </template>
    </OnyxNavButton>

    <template #contextArea>
      <OnyxUserMenu description="Company Name" full-name="Jane Doe">
        <OnyxMenuItem>
          <OnyxIcon :icon="settings" />
          Settings
        </OnyxMenuItem>

        <OnyxMenuItem color="danger">
          <OnyxIcon :icon="logout" />
          Logout
        </OnyxMenuItem>
      </OnyxUserMenu>
    </template>
  </OnyxNavBar>
</template>
