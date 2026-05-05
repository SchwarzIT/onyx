<script lang="ts" setup>
import "@sit-onyx/tiptap/style.css";
import type { OnyxAppLayoutProps } from "sit-onyx";

const props = defineProps<OnyxAppLayoutProps>();

defineSlots<{
  default?(): unknown;
  navBar?(): unknown;
}>();
const isVerticalNavBar = ref(true);
const route = useRoute();
const localePath = useLocalePath();

const isHomePage = computed(() => route.path === localePath("/"));
</script>

<template>
  <OnyxAppLayout
    v-bind="props"
    class="onyx-grid-max-lg onyx-grid-center"
    :nav-bar-alignment="isVerticalNavBar && isHomePage ? 'left' : 'top'"
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
