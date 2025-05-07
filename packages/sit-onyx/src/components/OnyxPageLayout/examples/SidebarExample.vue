<script setup lang="ts">
import { OnyxAppLayout, OnyxHeadline, OnyxLink, OnyxPageLayout, OnyxSidebar } from "../../..";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebar>
        <OnyxSidebar label="Example sidebar">
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
  </OnyxAppLayout>
</template>
