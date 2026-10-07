<script lang="ts" setup>
import { OnyxAppLayout, OnyxPageLayout, OnyxSidebar } from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebar>
        <OnyxSidebar label="Example sidebar">
          <!-- place your sidebar content here... -->
        </OnyxSidebar>
      </template>

      <!-- page content -->
      Place your main page content here...
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>
