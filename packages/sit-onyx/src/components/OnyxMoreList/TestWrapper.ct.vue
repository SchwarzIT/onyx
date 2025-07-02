<script lang="ts" setup>
import { ref } from "vue";
import OnyxNavItem from "../OnyxNavBar/modules/OnyxNavItem/OnyxNavItem.vue";
import { NAV_BAR_MORE_LIST_INJECTION_KEY } from "../OnyxNavBar/types.js";
import OnyxMoreList from "./OnyxMoreList.vue";
import type { MoreListSlotBindings } from "./types.js";

const props = defineProps<{
  /**
   * Number of components to show. Can also be decimal.
   */
  count?: number;
}>();

const emit = defineEmits<{
  visibilityChange: [value: MoreListSlotBindings];
}>();

const visible = ref(Infinity);

const handleVisibilityChange = (event: MoreListSlotBindings) => {
  visible.value = event.visibleElements ?? Infinity;
  emit("visibilityChange", event);
};

const COMPONENT_WIDTH = "8rem";
</script>

<template>
  <OnyxMoreList
    class="list"
    :injection-key="NAV_BAR_MORE_LIST_INJECTION_KEY"
    :style="{
      width: props.count ? `calc(${props.count} * ${COMPONENT_WIDTH})` : undefined,
    }"
    @visibility-change="handleVisibilityChange"
  >
    <template #default="{ attributes }">
      <ul v-bind="attributes" role="menu">
        <OnyxNavItem
          v-for="i in 24"
          :key="i"
          :label="`Element ${i}`"
          :style="{ minWidth: COMPONENT_WIDTH, display: i <= visible ? 'block' : 'none' }"
        />
      </ul>
    </template>
  </OnyxMoreList>
</template>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style scoped>
:deep(.onyx-more-list__elements),
:deep(.onyx-more-list__indicator) {
  padding: 0;
}
</style>
