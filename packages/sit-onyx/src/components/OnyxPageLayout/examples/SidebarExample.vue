<script setup lang="ts">
import { OnyxHeadline, OnyxLink, OnyxPageLayout, OnyxSidebar } from "../../..";
</script>

<template>
  <OnyxPageLayout>
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
