<script lang="ts" setup>
import logoUrl from "@sit-onyx/assets/onyx-brand/signet.svg";
import {
  OnyxAppLayout,
  OnyxHeadline,
  OnyxNavBar,
  OnyxNavItem,
  OnyxPageLayout,
  OnyxUserMenu,
} from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <ClientOnly>
        <OnyxNavBar app-name="App name" :logo-url :mobile="false">
          <OnyxNavItem label="Page" />
          <OnyxNavItem label="Page" />

          <template #contextArea>
            <OnyxUserMenu full-name="Jane Doe" />
          </template>
        </OnyxNavBar>
      </ClientOnly>
    </template>

    <OnyxPageLayout>
      <OnyxHeadline is="h1">Page content</OnyxHeadline>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.onyx-app {
  zoom: 0.45;
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-secondary);
  border-radius: var(--onyx-radius-md);

  :deep(.onyx-app__nav),
  :deep(.onyx-nav-bar) {
    border-radius: inherit;
  }
}
</style>
