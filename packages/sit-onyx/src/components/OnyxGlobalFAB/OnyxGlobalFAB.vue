<script lang="ts" setup>
import { computed } from "vue";
import { injectI18n } from "../../i18n/index.js";
import OnyxFAB from "../OnyxFAB/OnyxFAB.vue";
import OnyxFABItem from "../OnyxFABItem/OnyxFABItem.vue";
import { useGlobalFAB } from "./useGlobalFAB.js";

const globalFAB = useGlobalFAB();
const { t } = injectI18n();

const alignment = computed(() =>
  globalFAB.items.value.some((itemRef) => itemRef.value.alignment === "left") ? "left" : "right",
);
</script>

<template>
  <OnyxFAB v-if="globalFAB.items.value.length === 1" v-bind="globalFAB.items.value[0].value" />

  <OnyxFAB v-else-if="globalFAB.items.value.length > 1" :label="t('globalFAB.label')" :alignment>
    <OnyxFABItem
      v-for="item in globalFAB.items.value"
      :key="item.value.id"
      v-bind="{ ...item.value, ...item.value.ifOption }"
    />
  </OnyxFAB>
</template>
