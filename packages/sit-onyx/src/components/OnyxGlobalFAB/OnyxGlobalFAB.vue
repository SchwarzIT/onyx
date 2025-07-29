<script lang="ts" setup>
import { computed } from "vue";
import OnyxFAB from "../OnyxFAB/OnyxFAB.vue";
import OnyxFABItem from "../OnyxFABItem/OnyxFABItem.vue";
import { useGlobalFAB } from "./useGlobalFAB.js";

const fabItems = useGlobalFAB();
// align left if all items have left alignment otherwise align right
const alignment = computed(() =>
  fabItems.items.value.every((item) => item.alignment === "left") ? "left" : "right",
);

// hide label if all items have hideLabel set to true
const hideLabel = computed(() => fabItems.items.value.every((item) => item.hideLabel));
const hideLabelIfOption = computed(() =>
  fabItems.items.value.every((item) => item.hideLabelIfOption),
);
</script>

<!-- eslint-disable vue/no-root-v-if -->
<template>
  <OnyxFAB
    v-if="fabItems.items.value.length === 1"
    :class="fabItems.items.value[0].class"
    :label="fabItems.items.value[0].label"
    :icon="fabItems.items.value[0].icon"
    :alignment
    :hide-label
    @click="fabItems.items.value[0].onClick"
  />
  <OnyxFAB v-if="fabItems.items.value.length > 1" label="globalFAB" :alignment>
    <OnyxFABItem
      v-for="item in fabItems.items.value"
      :key="item.id"
      :label="item.label"
      :class="item.class"
      :icon="
        typeof item.iconIfOption === 'string'
          ? item.iconIfOption
          : !!item.iconIfOption && item.icon
            ? item.icon
            : ''
      "
      :hide-label="hideLabelIfOption"
      @click="item.onClick"
    />
  </OnyxFAB>
</template>

<style>
.onyx-fab-icon--rotated .onyx-icon {
  transform: rotate(180deg);
}
</style>
