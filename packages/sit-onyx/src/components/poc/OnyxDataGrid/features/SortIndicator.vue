<script setup lang="ts">
import { computed } from "vue";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import arrowsSort from "@sit-onyx/icons/arrows-sort.svg?raw";
import chevronUp from "@sit-onyx/icons/chevron-up.svg?raw";
import chevronDown from "@sit-onyx/icons/chevron-down.svg?raw";
import type { SortDirection } from "./sorting";

const props = defineProps<{ sortDirection: SortDirection }>();
const icon = computed(() =>
  props.sortDirection === 0 ? arrowsSort : props.sortDirection === 1 ? chevronUp : chevronDown,
);
</script>
<template>
  <OnyxIcon :icon="icon" size="12px" />
</template>
