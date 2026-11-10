<script lang="ts" setup>
import { iconFilePdf } from "@sit-onyx/icons";
import { OnyxGlobalSearchGroup, OnyxGlobalSearchOption } from "sit-onyx";
</script>

<template>
  <OnyxGlobalSearchGroup label="Group">
    <OnyxGlobalSearchOption label="Search result" :icon="iconFilePdf" value="1" />
    <OnyxGlobalSearchOption label="Search result" :icon="iconFilePdf" value="2" />
    <OnyxGlobalSearchOption label="Search result" :icon="iconFilePdf" value="3" />
  </OnyxGlobalSearchGroup>
</template>
