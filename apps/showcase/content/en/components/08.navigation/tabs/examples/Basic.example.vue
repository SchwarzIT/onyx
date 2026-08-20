<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxBadge, OnyxIcon, OnyxTab, OnyxTabs } from "sit-onyx";
import { ref } from "vue";

const tab = ref("tab-1");
</script>

<template>
  <OnyxTabs v-model="tab" label="Example tabs">
    <OnyxTab value="tab-1">
      <template #tab>
        <OnyxIcon :icon="iconPlaceholder" />
        Tab 1
      </template>

      Content for tab 1...
    </OnyxTab>

    <OnyxTab label="Tab 2" value="tab-2">Content for tab 2...</OnyxTab>

    <OnyxTab value="tab-3">
      <template #tab>
        Tab 3
        <OnyxBadge color="warning" dot />
      </template>

      Content for tab 3...
    </OnyxTab>

    <OnyxTab label="Tab 4" value="tab-4" disabled> Content for tab 4... </OnyxTab>
  </OnyxTabs>
</template>
