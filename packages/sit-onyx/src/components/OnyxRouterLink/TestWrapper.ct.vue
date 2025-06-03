<script lang="ts" setup>
import { provide, ref } from "vue";
import { ROUTER_INJECTION_KEY } from "../../composables/useLink";
import OnyxRouterLink from "./OnyxRouterLink.vue";
import type { OnyxRouterLinkProps } from "./types";

const props = defineProps<OnyxRouterLinkProps>();

defineSlots<{
  default(): unknown;
}>();

const mockRouterText = ref("");

provide(ROUTER_INJECTION_KEY, {
  currentRoute: ref("/foo/bar/baz"),
  push: (to) => {
    mockRouterText.value = `Used internal router for "${to}"`;
  },
});
</script>

<template>
  <OnyxRouterLink v-bind="props">
    <slot></slot>
    {{ mockRouterText }}
  </OnyxRouterLink>
</template>
