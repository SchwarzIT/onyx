<script lang="ts" setup>
import logoUrl from "@sit-onyx/assets/onyx-brand/signet.svg";
import { OnyxAppLayout, OnyxNavBar, OnyxNavItem } from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <OnyxNavBar app-name="App name" :logo-url>
        <OnyxNavItem label="Page 1" link="/page-1" />
        <OnyxNavItem label="Page 2" link="/page-2" />
      </OnyxNavBar>
    </template>
  </OnyxAppLayout>
</template>
