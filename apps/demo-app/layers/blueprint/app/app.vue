<script lang="ts" setup>
import type { OnyxAppLayoutProps } from "sit-onyx";

const props = defineProps<OnyxAppLayoutProps>();

defineSlots<{
  default?(): unknown;
  navBar?(): unknown;
}>();
const isVerticalNavBar = ref(false);
</script>

<template>
  <OnyxAppLayout
    v-bind="props"
    class="onyx-grid-max-lg onyx-grid-center"
    :nav-bar-alignment="isVerticalNavBar ? 'left' : 'top'"
  >
    <template #navBar>
      <slot name="navBar">
        <NavBar v-model:is-vertical-nav-bar="isVerticalNavBar" />
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

<style lang="scss" scoped>
.onyx-app:has(.onyx-nav-bar--vertical) {
  :deep(.onyx-fab--left) {
    --onyx-fab-offset-x: calc(4 * var(--onyx-spacing-2xs) + 24px);
  }
}
.onyx-app:has(.onyx-nav-bar--vertical.onyx-nav-bar--expanded) {
  :deep(.onyx-fab--left) {
    --onyx-fab-offset-x: 20rem;
  }
}
</style>
