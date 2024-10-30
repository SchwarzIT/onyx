<script lang="ts" setup>
import OnyxNavButton from "../OnyxNavBar/modules/OnyxNavButton/OnyxNavButton.vue";
import { NAV_BAR_BUTTONS_INJECTION_KEY } from "../OnyxNavBar/types";
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
    is="ul"
    class="list"
    role="menu"
    :injection-key="NAV_BAR_BUTTONS_INJECTION_KEY"
    :style="{
      width: props.count ? `calc(${props.count} * ${COMPONENT_WIDTH})` : undefined,
    }"
    @visibility-change="emit('visibilityChange', $event)"
  >
    <OnyxNavButton
      v-for="i in 24"
      :key="i"
      :label="`Element ${i}`"
      :style="{ minWidth: COMPONENT_WIDTH }"
    />
  </OnyxMoreList>
</template>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style scoped>
.list {
  padding: 0;
  gap: 0;
}
</style>
