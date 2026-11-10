<script lang="ts" setup>
import { OnyxTab, OnyxTabs } from "sit-onyx";
import { ref } from "vue";

const tab = ref("tab-1");
</script>

<template>
  <OnyxTabs v-model="tab" label="Tabs" stretched>
    <OnyxTab label="Tab" value="tab-1" />
  </OnyxTabs>
</template>
