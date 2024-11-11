<script lang="ts" setup>
import { ref } from "vue";
import OnyxTab from "../OnyxTab/OnyxTab.vue";
import OnyxTabs from "./OnyxTabs.vue";

const activeTab = ref("tab-1");
</script>

<template>
  <OnyxTabs v-model="activeTab" label="Example tabs">
    <OnyxTab label="Tab 1" value="tab-1"> Panel content 1... </OnyxTab>
    <OnyxTab label="Tab 2" value="tab-2"> Panel content 2... </OnyxTab>
  </OnyxTabs>
</template>
