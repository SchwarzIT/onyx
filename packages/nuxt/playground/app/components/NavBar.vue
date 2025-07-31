<script lang="ts" setup>
import { iconLogout, iconSettings } from "@sit-onyx/icons";

const localePath = useLocalePath();
</script>

<template>
  <OnyxNavBar app-name="Nuxt module Playground">
    <OnyxNavItem label="Page 1" :link="localePath('/')" />
    <OnyxNavItem label="Page 2" :link="localePath('/test')" />

    <template #contextArea>
      <OnyxUserMenu description="Company Name" full-name="Jane Doe">
        <OnyxMenuItem>
          <OnyxIcon :icon="iconSettings" />
          Settings
        </OnyxMenuItem>

        <OnyxMenuItem color="danger">
          <OnyxIcon :icon="iconLogout" />
          Logout
        </OnyxMenuItem>
      </OnyxUserMenu>
    </template>
  </OnyxNavBar>
</template>
