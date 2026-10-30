<script lang="ts" setup>
import { OnyxBreadcrumb, OnyxBreadcrumbItem } from "sit-onyx";
</script>

<template>
  <ClientOnly>
    <OnyxBreadcrumb>
      <OnyxBreadcrumbItem href="#1">Path</OnyxBreadcrumbItem>
      <OnyxBreadcrumbItem href="#2">Path</OnyxBreadcrumbItem>
      <OnyxBreadcrumbItem href="#4" active>Path</OnyxBreadcrumbItem>
    </OnyxBreadcrumb>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.onyx-breadcrumb {
  width: 100%;
}
</style>
