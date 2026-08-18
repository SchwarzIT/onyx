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

    <OnyxPageLayout>
      <OnyxBreadcrumb class="breadcrumb">
        <OnyxBreadcrumbItem href="/teams">Teams</OnyxBreadcrumbItem>
        <OnyxBreadcrumbItem href="/teams/onyx">onyx</OnyxBreadcrumbItem>
      </OnyxBreadcrumb>

      <OnyxHeadline is="h2">Page headline</OnyxHeadline>

      Example page content...
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.breadcrumb {
  margin-bottom: var(--onyx-grid-gutter);
}
</style>
