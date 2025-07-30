<script lang="ts" setup>
import { computed } from "vue";
import OnyxFAB from "../OnyxFAB/OnyxFAB.vue";
import OnyxFABItem from "../OnyxFABItem/OnyxFABItem.vue";
import { useGlobalFAB, type ProvidedFABItem } from "./useGlobalFAB.js";

const fabItems = useGlobalFAB();
// align left if all items have left alignment otherwise align right
const alignment = computed(() =>
  fabItems.items.value.some((item) => item.alignment === "right") ? "right" : "left",
);

// hide label if all items have hideLabel set to true
const hideLabel = computed(() => fabItems.items.value.every((item) => item.hideLabel));
const hideLabelIfOption = computed(() =>
  fabItems.items.value.every((item) => item.ifOption?.hideLabel),
);

const firstFabItemLabel = computed(() => {
  const label = fabItems.items.value[0].label;
  return label && typeof label === "object" && "value" in label ? label.value : label;
});

const getOptionItemLabel = (item: ProvidedFABItem) => {
  return item.ifOption?.label
    ? typeof item.ifOption.label === "string"
      ? item.ifOption.label
      : item.ifOption.label.value
    : typeof fabItems.items.value[0].label === "string"
      ? fabItems.items.value[0].label
      : fabItems.items.value[0].label.value;
};
</script>

<!-- eslint-disable vue/no-root-v-if -->
<template>
  <OnyxFAB
    v-if="fabItems.items.value.length === 1"
    :class="fabItems.items.value[0].class"
    :label="firstFabItemLabel"
    :icon="fabItems.items.value[0].icon"
    :alignment
    :hide-label
    @click="fabItems.items.value[0].onClick"
  />
  <OnyxFAB v-else-if="fabItems.items.value.length > 1" label="globalFAB" :alignment>
    <OnyxFABItem
      v-for="item in fabItems.items.value"
      :key="item.id"
      :label="getOptionItemLabel(item)"
      :class="item.ifOption?.class ?? item.class"
      :icon="item.ifOption?.icon !== undefined ? item.ifOption?.icon : item.icon"
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
