<script lang="ts" setup>
import { OnyxCodeTab, OnyxCodeTabs } from "sit-onyx";
import { ref } from "vue";

const selectedTab = ref("tab-1");
</script>

<template>
  <OnyxCodeTabs v-model="selectedTab" label="Code tabs">
    <OnyxCodeTab code='console.log("Hello World");' label="index.ts" language="ts" value="tab-1" />
  </OnyxCodeTabs>
</template>
