<script lang="ts" setup>
import { ref } from "vue";
import { createTabs } from "./createTabs.js";

const selectedTab = ref("tab-1");

const {
  elements: { tablist, tab, tabpanel },
} = createTabs({
  label: "Tablist label",
  selectedTab,
  onSelect: (tab) => (selectedTab.value = tab),
});
</script>

<template>
  <div>
    <div v-bind="tablist">
      <button v-bind="tab({ value: 'tab-1' })" type="button">Tab 1</button>
      <button v-bind="tab({ value: 'tab-2' })" type="button">Tab 2</button>
      <button v-bind="tab({ value: 'tab-3' })" type="button">Tab 3</button>
    </div>

    <div v-if="selectedTab === 'tab-1'" v-bind="tabpanel({ value: 'tab-1' })">Tab content 1</div>
    <div v-if="selectedTab === 'tab-2'" v-bind="tabpanel({ value: 'tab-2' })">Tab content 2</div>
    <div v-if="selectedTab === 'tab-3'" v-bind="tabpanel({ value: 'tab-3' })">Tab content 3</div>
  </div>
</template>
