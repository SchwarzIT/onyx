<script setup lang="ts">
import { ref } from "vue";
import OnyxFlyout from "./OnyxFlyout.vue";
import type { OnyxFlyoutProps } from "./types";

const props = defineProps<OnyxFlyoutProps>();
const isExpanded = ref(false);
</script>

<template>
  <button
    class="onyx-component"
    type="button"
    label="changeExpandedButton"
    @click="isExpanded = !isExpanded"
  >
    Change Expanded
  </button>
  <OnyxFlyout v-bind="props" :expanded="isExpanded">
    <template #default="{ trigger }">
      <button v-bind="trigger" label="button" type="button">Open</button>
    </template>
    <template #content>
      <div label="content">Flyout Content</div>
    </template>
  </OnyxFlyout>
</template>
