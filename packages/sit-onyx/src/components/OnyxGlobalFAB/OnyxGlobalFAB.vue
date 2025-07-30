<script lang="ts" setup>
import { computed } from "vue";
import OnyxFAB from "../OnyxFAB/OnyxFAB.vue";
import OnyxFABItem from "../OnyxFABItem/OnyxFABItem.vue";
import { useGlobalFAB } from "./useGlobalFAB.js";

const fabItems = useGlobalFAB();

const alignment = computed(() =>
  fabItems.items.value.some((itemRef) => itemRef.value.alignment === "right") ? "right" : "left",
);

const hideLabel = computed(() => fabItems.items.value.every((itemRef) => itemRef.value.hideLabel));
const hideLabelIfOption = computed(() =>
  fabItems.items.value.every((itemRef) => itemRef.value.ifOption?.hideLabel),
);
</script>

<template>
  <OnyxFAB
    v-if="fabItems.items.value.length === 1"
    :class="fabItems.items.value[0].value.class"
    :label="fabItems.items.value[0]?.value.label"
    :icon="fabItems.items.value[0].value.icon"
    :alignment
    :hide-label="hideLabel"
    @click="fabItems.items.value[0].value.onClick"
  />
  <OnyxFAB v-else-if="fabItems.items.value.length > 1" label="globalFAB" :alignment>
    <OnyxFABItem
      v-for="item in fabItems.items.value"
      :key="item.value.id"
      :label="item.value.ifOption?.label ?? item.value.label"
      :class="item.value.ifOption?.class ?? item.value.class"
      :icon="item.value.ifOption?.icon !== undefined ? item.value.ifOption?.icon : item.value.icon"
      :hide-label="hideLabelIfOption"
      @click="item.value.onClick"
    />
  </OnyxFAB>
</template>

<style>
.onyx-fab-icon--rotated .onyx-icon {
  transform: rotate(180deg);
}
</style>
