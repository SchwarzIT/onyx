<script lang="ts" setup>
import logout from "@sit-onyx/icons/logout.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import type { OnyxNavButtonProps } from "sit-onyx";

const localePath = useLocalePath();

const navButtons = computed(
  () =>
    [
      { label: "Page 1", link: localePath("/") },
      { label: "Page 2", link: localePath("/test") },
    ] satisfies OnyxNavButtonProps[],
);
</script>

<template>
  <OnyxNavBar app-name="Nuxt module Playground">
    <OnyxNavButton
      v-for="navButton in navButtons"
      :key="navButton.link"
      v-bind="navButton"
      :active="$route.path === navButton.link"
    />

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
