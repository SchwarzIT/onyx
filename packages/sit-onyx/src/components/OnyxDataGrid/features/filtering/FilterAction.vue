<script setup lang="ts">
import searchX from "@sit-onyx/icons/search-x.svg?raw";
import OnyxSystemButton from "../../../OnyxSystemButton/OnyxSystemButton.vue";

const props = defineProps<{
  /**
   * The label for the remove search button.
   */
  buttonLabel: string;
  /**
   * The current filter value.
   */
  filter: string;
}>();
</script>

<template>
  <OnyxSystemButton :label="props.buttonLabel" :icon="searchX" color="medium" />
</template>
