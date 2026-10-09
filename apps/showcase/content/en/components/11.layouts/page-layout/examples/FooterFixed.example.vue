<script setup lang="ts">
import { OnyxAppLayout, OnyxBottomBar, OnyxButton, OnyxPageLayout } from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      Place your main page content here...

      <template #footer>
        <OnyxBottomBar>
          <OnyxButton label="Button" />
        </OnyxBottomBar>
      </template>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>
