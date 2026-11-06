<script lang="ts" setup>
import { OnyxTabs, type TabSize } from "sit-onyx";
import { ref } from "vue";

const props = defineProps<{
  label: string;
  initialValue: string;
  size?: TabSize;
}>();

defineSlots<{
  default(): unknown;
}>();

const tab = ref("");
watch(
  () => props.initialValue,
  () => {
    tab.value = props.initialValue;
  },
  { immediate: true },
);
</script>

<template>
  <OnyxTabs v-model="tab" :label="props.label" :size="props.size">
    <slot></slot>
  </OnyxTabs>
</template>
