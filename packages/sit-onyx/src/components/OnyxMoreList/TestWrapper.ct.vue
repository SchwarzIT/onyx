<script lang="ts">
export const TEST_MORE_LIST_INJECTION_KEY = Symbol("TEST_MORE_LIST_INJECTION_KEY");
</script>

<script lang="ts" setup>
import { ref } from "vue";
import OnyxMoreList from "./OnyxMoreList.vue";
import TestChild from "./TestChild.vue";
import type { MoreListSlotBindings, OnyxMoreListProps } from "./types.js";

const props = defineProps<{
  /**
   * Number of components to show. Can also be decimal.
   */
  count?: number;
  passThroughProps?: Partial<OnyxMoreListProps>;
}>();

const emit = defineEmits<{
  visibilityChange: [value: MoreListSlotBindings];
}>();

const visible = ref(Infinity);

const handleVisibilityChange = (event: MoreListSlotBindings) => {
  visible.value = event.visibleElements ?? Infinity;
  emit("visibilityChange", event);
};

const COMPONENT_WIDTH = "100px";
</script>

<template>
  <OnyxMoreList
    class="list"
    :injection-key="TEST_MORE_LIST_INJECTION_KEY"
    :style="{
      width: props.count ? `calc(${props.count} * ${COMPONENT_WIDTH})` : undefined,
    }"
    v-bind="props.passThroughProps"
    @visibility-change="handleVisibilityChange"
  >
    <template #default="{ attributes }">
      <div v-bind="attributes">
        <TestChild
          v-for="i in 24"
          :key="i"
          :style="{
            minWidth: COMPONENT_WIDTH,
            maxWidth: COMPONENT_WIDTH,
          }"
        >
          {{ `Element ${i}` }}
        </TestChild>
      </div>
    </template>
  </OnyxMoreList>
</template>
