<script lang="ts" setup>
import { inject } from "vue";
import { PROSE_TABLE_INJECTION_KEY } from "./utils.js";

defineSlots<{
  default(): unknown;
}>();

const tableContext = inject(PROSE_TABLE_INJECTION_KEY, undefined);
</script>

<template>
  <Teleport v-if="tableContext?.headRef.value" :to="tableContext.headRef.value">
    <slot></slot>
  </Teleport>

  <slot v-else></slot>
</template>
