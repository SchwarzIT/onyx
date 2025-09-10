<script lang="ts" setup>
import { iconCopy, iconLink } from "@sit-onyx/icons";
import { OnyxButton, OnyxDialog, OnyxIcon, OnyxInput, OnyxSystemButton } from "../../../index.js";
</script>

<template>
  <OnyxDialog label="Url" non-dismissible button-text="Open Dialog">
    <template #trigger="{ trigger }">
      <OnyxButton label="Open Dialog" v-bind="trigger" />
    </template>
    <template #headline>
      <OnyxInput label="Url" placeholder="https://onyx.schwarz">
        <template #leading><OnyxIcon :icon="iconLink" /></template>
        <template #trailing><OnyxSystemButton label="copy" :icon="iconCopy" /> </template>
      </OnyxInput>
    </template>
  </OnyxDialog>
</template>
