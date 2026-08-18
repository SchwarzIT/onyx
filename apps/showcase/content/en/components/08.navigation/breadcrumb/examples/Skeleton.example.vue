<script lang="ts" setup>
import logoUrl from "@sit-onyx/assets/onyx-brand/signet.svg";
import {
  OnyxAppLayout,
  OnyxBreadcrumb,
  OnyxBreadcrumbItem,
  OnyxHeadline,
  OnyxNavBar,
  OnyxNavItem,
  OnyxPageLayout,
} from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <OnyxNavBar app-name="App name" :logo-url>
        <OnyxNavItem label="Page 1" />
      </OnyxNavBar>
    </template>

    <OnyxPageLayout no-padding>
      <OnyxBreadcrumb class="onyx-grid-layout breadcrumb">
        <OnyxBreadcrumbItem href="/users">Users</OnyxBreadcrumbItem>
        <OnyxBreadcrumbItem href="/users/jane-doe">Jane Doe</OnyxBreadcrumbItem>
        <OnyxBreadcrumbItem href="/users/jane-doe/orders">Orders</OnyxBreadcrumbItem>
        <OnyxBreadcrumbItem href="/users/jane-doe/orders/123456">#123456</OnyxBreadcrumbItem>
      </OnyxBreadcrumb>

      <div class="onyx-grid-layout">
        <OnyxHeadline is="h2">Page headline</OnyxHeadline>

        Example page content...
      </div>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.breadcrumb {
  padding-block: var(--onyx-grid-gutter);

  + .onyx-grid-layout {
    padding-top: 0;
  }
}
</style>
