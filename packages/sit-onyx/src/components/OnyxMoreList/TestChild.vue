<script lang="ts" setup>
import { useMoreListChild } from "../../composables/useMoreList.js";
import { TEST_MORE_LIST_INJECTION_KEY } from "./TestWrapper.ct.vue";

defineSlots<{
  /**
   * Content.
   */
  default?(): unknown;
}>();

const { componentRef, isVisible } = useMoreListChild(TEST_MORE_LIST_INJECTION_KEY);
</script>

<template>
  <span v-show="isVisible" ref="componentRef" class="onyx-component onyx-text"><slot></slot></span>
</template>
