<script setup lang="ts">
import { OnyxAppLayout, OnyxBottomBar, OnyxButton, OnyxPageLayout, OnyxSidebar } from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout footer-alignment="page">
      <template #sidebar>
        <OnyxSidebar label="Example sidebar">
          <!-- place your sidebar content here... -->
        </OnyxSidebar>
      </template>

      <!-- page content -->
      Place your main page content here...

      <template #footer>
        <OnyxBottomBar>
          <OnyxButton label="Button" />
        </OnyxBottomBar>
      </template>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>
