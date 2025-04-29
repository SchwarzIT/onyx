<script lang="ts" setup>
import { OnyxAppLayout, OnyxPageLayout } from "../../..";
</script>

<template>
  <OnyxAppLayout nav-alignment="left">
    <template #nav>
      <aside class="navigation">Your custom left navigation here</aside>
    </template>

    <OnyxPageLayout> This is the main page content. </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.navigation {
  border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background-color: var(--onyx-color-base-background-blank);
  height: 100%;
  padding: var(--onyx-density-md);
}
</style>
