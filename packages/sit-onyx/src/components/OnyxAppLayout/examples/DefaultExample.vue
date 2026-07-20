<script lang="ts" setup>
import logoUrl from "@sit-onyx/assets/onyx-brand/signet.svg";
import { OnyxAppLayout, OnyxNavBar, OnyxNavItem, OnyxPageLayout } from "../../../index.js";
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <OnyxNavBar app-name="Nav bar" :logo-url>
        <OnyxNavItem label="Page 1" />
        <OnyxNavItem label="Page 2" />
      </OnyxNavBar>
    </template>

    <OnyxPageLayout> This is the main page content. </OnyxPageLayout>
  </OnyxAppLayout>
</template>
