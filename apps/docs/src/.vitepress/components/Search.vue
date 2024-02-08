<script lang="ts" setup>
import { computed } from "vue";
import OnyxIcon from "~components/OnyxIcon/OnyxIcon.vue";
import searchIcon from "@sit-onyx/icons/search.svg?raw";

const props = defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value as string),
});
</script>

<template>
  <label aria-label="Search">
    <input placeholder="Search" type="search" v-model="value" />
    <OnyxIcon :icon="searchIcon" />
  </label>
</template>

<style lang="scss" scoped></style>
