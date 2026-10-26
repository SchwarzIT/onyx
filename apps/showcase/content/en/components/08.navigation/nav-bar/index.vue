<script lang="ts" setup>
import logoUrl from "@sit-onyx/assets/onyx-brand/signet.svg";
import { iconBell, iconSearch } from "@sit-onyx/icons";
import {
  OnyxAppLayout,
  OnyxNavBar,
  OnyxNavItem,
  OnyxSeparator,
  OnyxUnstableNavButton,
  OnyxUserMenu,
} from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <ClientOnly>
        <OnyxNavBar app-name="App name" :logo-url :mobile="false">
          <OnyxNavItem label="Item" />
          <OnyxNavItem label="Item" />
          <OnyxNavItem label="Item" />

          <template #contextArea>
            <OnyxUnstableNavButton label="Search" :icon="iconSearch" hide-label />
            <OnyxUnstableNavButton label="Notifications" :icon="iconBell" hide-label />

            <OnyxSeparator orientation="vertical" />

            <OnyxUserMenu full-name="Jane Doe" />
          </template>
        </OnyxNavBar>
      </ClientOnly>
    </template>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.onyx-app {
  zoom: 0.4;
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-secondary);
  border-radius: var(--onyx-radius-md);

  :deep(.onyx-app__nav),
  :deep(.onyx-nav-bar) {
    border-radius: inherit;
  }
}
</style>
