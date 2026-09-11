<script lang="ts" setup>
import { computed, inject } from "vue";
import { PROSE_DETAILS_INJECTION_KEY } from "./utils.js";

defineSlots<{
  default(): unknown;
}>();

const detailsContext = inject(PROSE_DETAILS_INJECTION_KEY, undefined);
const teleportTarget = computed(() => detailsContext?.headerRef.value);
</script>

<template>
  <Teleport v-if="teleportTarget" :to="teleportTarget">
    <slot> </slot>
  </Teleport>

  <slot v-else></slot>
</template>
