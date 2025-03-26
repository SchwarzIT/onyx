<script lang="ts" setup>
import OnyxNavItem from "../OnyxNavBar/modules/OnyxNavItem/OnyxNavItem.vue";
import { NAV_BAR_MORE_LIST_INJECTION_KEY } from "../OnyxNavBar/types";
import OnyxMoreList from "./OnyxMoreList.vue";
import type { MoreListSlotBindings } from "./types";

const props = defineProps<{
  /**
   * Number of components to show. Can also be decimal.
   */
  count?: number;
}>();

const emit = defineEmits<{
  visibilityChange: [value: MoreListSlotBindings];
}>();

const COMPONENT_WIDTH = "8rem";
</script>

<template>
  <OnyxMoreList
    class="list"
    :injection-key="NAV_BAR_MORE_LIST_INJECTION_KEY"
    :style="{
      width: props.count ? `calc(${props.count} * ${COMPONENT_WIDTH})` : undefined,
    }"
    @visibility-change="emit('visibilityChange', $event)"
  >
    <template #default="{ attributes }">
      <ul v-bind="attributes" role="menu">
        <OnyxNavItem
          v-for="i in 24"
          :key="i"
          :label="`Element ${i}`"
          :style="{ minWidth: COMPONENT_WIDTH }"
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
