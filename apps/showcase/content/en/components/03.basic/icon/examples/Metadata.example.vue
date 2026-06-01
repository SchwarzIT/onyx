<script lang="ts" setup>
import { ICON_METADATA } from "@sit-onyx/icons/utils";
import { OnyxCodeTab, OnyxCodeTabs } from "sit-onyx";
</script>

<template>
  <OnyxCodeTabs model-value="code">
    <OnyxCodeTab
      value="code"
      label='Metadata for "bread" icon'
      :code="JSON.stringify(ICON_METADATA.bread, null, 2)"
      language="json"
    />
  </OnyxCodeTabs>
</template>
