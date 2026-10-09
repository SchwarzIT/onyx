<script lang="ts" setup>
import { OnyxCodeTab, OnyxCodeTabs } from "sit-onyx";
import { ref } from "vue";

const selectedTab = ref("tab-1");
</script>

<template>
  <OnyxCodeTabs v-model="selectedTab" label="Example code snippets" skeleton>
    <OnyxCodeTab code="console.log('Hello World');" label="index.ts" language="ts" value="tab-1" />
    <OnyxCodeTab code="console.log('Hello World');" label="index.ts" language="ts" value="tab-2" />
    <OnyxCodeTab code="console.log('Hello World');" label="index.ts" language="ts" value="tab-3" />
  </OnyxCodeTabs>
</template>
