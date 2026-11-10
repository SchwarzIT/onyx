<script lang="ts" setup>
import { OnyxTabs, useForwardProps, type OnyxTabsProps } from "sit-onyx";
import { ref } from "vue";

const props = defineProps<
  Omit<OnyxTabsProps, "modelValue"> & {
    initialValue: string;
  }
>();

defineSlots<{
  default(): unknown;
}>();

// eslint-disable-next-line vue/no-setup-props-reactivity-loss -- using watcher below
const tab = ref(props.initialValue);
watch(
  () => props.initialValue,
  (newValue) => (tab.value = newValue),
);

const tabsProps = useForwardProps(props, OnyxTabs);
</script>

<template>
  <OnyxTabs v-model="tab" :label="props.label" v-bind="tabsProps">
    <slot></slot>
  </OnyxTabs>
</template>
