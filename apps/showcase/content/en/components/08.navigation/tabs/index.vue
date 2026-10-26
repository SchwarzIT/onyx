<script lang="ts" setup>
import { OnyxTab, OnyxTabs } from "sit-onyx";
import { ref } from "vue";

const tab = ref("tab-1");
</script>

<template>
  <OnyxTabs v-model="tab" label="Example tabs" stretched>
    <OnyxTab label="Tab" value="tab-1" />
    <OnyxTab label="Tab" value="tab-2" />
    <OnyxTab label="Tab" value="tab-3" />
    <OnyxTab label="Tab" value="tab-4" />
  </OnyxTabs>
</template>

<style lang="scss" scoped>
.onyx-tabs {
  --onyx-tabs-tablist-margin-bottom: 0;
}
</style>
