<script lang="ts" setup>
import { OnyxTab, OnyxTabs } from "sit-onyx";
import { ref } from "vue";

const tab = ref("tab-1");
</script>

<template>
  <OnyxTabs v-model="tab" label="Example tabs" stretched>
    <OnyxTab label="Tab 1" value="tab-1">Content for tab 1...</OnyxTab>
    <OnyxTab label="Tab 2" value="tab-2">Content for tab 2...</OnyxTab>
  </OnyxTabs>
</template>
