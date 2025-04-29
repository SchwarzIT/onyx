<script setup lang="ts">
import { OnyxHeadline, OnyxLink, OnyxPageLayout, OnyxSidebar } from "../../..";
</script>

<template>
  <OnyxPageLayout class="page">
    <template #sidebar>
      <OnyxSidebar>
        <template #header>
          For sidebar examples, see:
          <OnyxLink href="/?path=/docs/navigation-sidebar--docs" target="_parent">
            OnyxSidebar
          </OnyxLink>
        </template>
      </OnyxSidebar>
    </template>

    <!-- page content -->
    <OnyxHeadline is="h1">Page content</OnyxHeadline>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.page {
  // only needed for this example. Can be removed if used together with the OnyxAppLayout
  height: 100vh;
}
</style>
