<script lang="ts" setup>
import logoUrl from "@sit-onyx/assets/onyx-brand/signet.svg";
import { OnyxAppLayout, OnyxNavBar, OnyxNavItem } from "sit-onyx";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <OnyxNavBar app-name="App name" :logo-url with-back-button @navigate-back="router.back">
        <OnyxNavItem label="Page 1" link="/page-1" />
      </OnyxNavBar>
    </template>
  </OnyxAppLayout>
</template>
