<script lang="ts" setup>
import type { OnyxAppLayoutProps } from "sit-onyx";

const props = defineProps<OnyxAppLayoutProps>();

defineSlots<{
  default?(): unknown;
  navBar?(): unknown;
}>();
</script>

<template>
  <OnyxAppLayout v-bind="props" class="onyx-grid-max-lg onyx-grid-center">
    <template #navBar>
      <slot name="navBar">
        <NavBar />
      </slot>
    </template>

    <NuxtLayout>
      <NuxtRouteAnnouncer />

      <slot>
        <NuxtPage />
      </slot>
    </NuxtLayout>
  </OnyxAppLayout>
</template>
