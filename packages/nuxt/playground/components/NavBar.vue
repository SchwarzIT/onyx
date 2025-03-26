<script lang="ts" setup>
import logout from "@sit-onyx/icons/logout.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";

const localePath = useLocalePath();
</script>

<template>
  <OnyxNavBar app-name="Nuxt module Playground">
    <OnyxNavItem label="Page 1" :link="localePath('/')" />
    <OnyxNavItem label="Page 2" :link="localePath('/test')" />

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
