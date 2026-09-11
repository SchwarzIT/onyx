<script lang="ts" setup>
import { OnyxTab, OnyxTabs } from "sit-onyx";
import { ref } from "vue";

const tab = ref("tab-1");
</script>

<template>
  <OnyxTabs v-model="tab" label="Example tabs" skeleton>
    <OnyxTab label="Tab 1" value="tab-1">
      <!-- place content here once loaded -->
    </OnyxTab>

    <OnyxTab label="Tab 2" value="tab-2">
      <!-- place content here once loaded -->
    </OnyxTab>
  </OnyxTabs>
</template>
