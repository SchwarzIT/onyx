<script lang="ts" setup>
import { provide, toRef } from "vue";
import { ROUTER_INJECTION_KEY } from "../../../../composables/useLink.js";
import OnyxNavItem from "./OnyxNavItem.vue";
import type { OnyxNavItemProps } from "./types.js";

const props = withDefaults(
  defineProps<
    OnyxNavItemProps & {
      /** Current route */
      currentRoute: string;
    }
  >(),
  {
    // Vue defaults boolean props to false so we explicitly set undefined here
    active: undefined,
  },
);

provide(ROUTER_INJECTION_KEY, {
  currentRoute: toRef(props, "currentRoute"),
  push: () => ({}),
});
</script>

<template>
  <OnyxNavItem v-bind="props" />
</template>
