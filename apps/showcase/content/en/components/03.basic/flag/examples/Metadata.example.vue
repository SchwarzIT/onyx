<script lang="ts" setup>
import { FLAG_METADATA } from "@sit-onyx/flags/utils";
import { OnyxCodeTab, OnyxCodeTabs } from "sit-onyx";
</script>

<template>
  <OnyxCodeTabs model-value="code">
    <OnyxCodeTab
      value="code"
      label="Metadata for DE"
      :code="JSON.stringify(FLAG_METADATA.DE, null, 2)"
      language="json"
    />
  </OnyxCodeTabs>
</template>
