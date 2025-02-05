<script lang="ts" setup>
import { provide, toRef } from "vue";
import { ROUTER_INJECTION_KEY } from "../../../../composables/useLink";
import OnyxNavButton from "./OnyxNavButton.vue";
import type { OnyxNavButtonProps } from "./types";

const props = withDefaults(
  defineProps<
    OnyxNavButtonProps & {
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
  <OnyxNavButton v-bind="props" />
</template>
