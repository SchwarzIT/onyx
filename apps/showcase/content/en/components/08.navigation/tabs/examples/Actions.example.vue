<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxTab, OnyxTabs, OnyxTag } from "sit-onyx";
import { ref } from "vue";

const tab = ref("tab-1");
</script>

<template>
  <OnyxTabs v-model="tab" label="Example tabs">
    <template #actions>
      <OnyxTag label="Tag" color="primary" />
      <OnyxSystemButton label="Example action" :icon="iconPlaceholder" />
    </template>

    <OnyxTab label="Tab 1" value="tab-1">Content for tab 1...</OnyxTab>
    <OnyxTab label="Tab 2" value="tab-2">Content for tab 2...</OnyxTab>
  </OnyxTabs>
</template>
