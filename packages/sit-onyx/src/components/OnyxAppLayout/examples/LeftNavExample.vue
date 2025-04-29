<script lang="ts" setup>
import { OnyxAppLayout, OnyxPageLayout, OnyxSidebar } from "../../..";
</script>

<template>
  <OnyxAppLayout nav-alignment="left">
    <template #nav>
      <OnyxSidebar> Side navigation </OnyxSidebar>
    </template>

    <OnyxPageLayout> This is the main page content. </OnyxPageLayout>
  </OnyxAppLayout>
</template>
