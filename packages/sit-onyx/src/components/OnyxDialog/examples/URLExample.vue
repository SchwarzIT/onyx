<script lang="ts" setup>
import { iconCopy, iconLink } from "@sit-onyx/icons";
import OnyxIcon from "../../OnyxIcon/OnyxIcon.vue";
import OnyxInput from "../../OnyxInput/OnyxInput.vue";
import OnyxSystemButton from "../../OnyxSystemButton/OnyxSystemButton.vue";
import OnyxDialog from "../OnyxDialog.vue";
</script>

<template>
  <OnyxDialog label="Url" non-dismissible button-text="Open Dialog">
    <template #headline>
      <OnyxInput label="Url" placeholder="https://onyx.schwarz">
        <template #leading><OnyxIcon :icon="iconLink" /></template>
        <template #trailing><OnyxSystemButton label="copy" :icon="iconCopy" /> </template>
      </OnyxInput>
    </template>
  </OnyxDialog>
</template>
