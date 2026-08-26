<script lang="ts" setup>
import { useScrollBehavior } from "./composables/useScrollBehavior.js";

defineSlots<{
  /**
   * Page content. Can e.g. be used to display a custom error page inside `error.vue`.
   */
  default?(): unknown;
}>();

const app = useTemplateRef("app");
useScrollBehavior({ root: app });
</script>

<template>
  <OnyxAppLayout ref="app" class="onyx-grid-max-lg onyx-grid-center">
    <template #navBar>
      <NavBar />
    </template>

    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <slot>
        <NuxtPage />
      </slot>
    </NuxtLayout>
  </OnyxAppLayout>
</template>
