<script lang="ts" setup>
import logout from "@sit-onyx/icons/logout.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import type { OnyxNavButtonProps } from "sit-onyx";

const localePath = useLocalePath();

const navButtons = computed<OnyxNavButtonProps[]>(() => [
  { label: "Page 1", href: localePath("/") },
  { label: "Page 2", href: localePath("/test") },
]);
</script>

<template>
  <OnyxNavBar app-name="Nuxt module Playground">
    <OnyxNavButton
      v-for="navButton in navButtons"
      :key="navButton.href"
      v-bind="navButton"
      :active="$route.path === navButton.href"
    />

    <template #contextArea>
      <OnyxUserMenu description="Company Name" username="Jane Doe">
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
