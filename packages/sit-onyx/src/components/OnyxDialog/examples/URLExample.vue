<script lang="ts" setup>
import { iconCopy, iconLink } from "@sit-onyx/icons";
import OnyxIcon from "../../OnyxIcon/OnyxIcon.vue";
import OnyxInput from "../../OnyxInput/OnyxInput.vue";
import OnyxSystemButton from "../../OnyxSystemButton/OnyxSystemButton.vue";
import OnyxDialog from "../OnyxDialog.vue";
</script>

<template>
  <div>
    <OnyxDialog :open="true" label="Url" non-dismissible>
      <template #headline>
        <OnyxInput label="Url" placeholder="https://onyx.schwarz">
          <template #leading><OnyxIcon :icon="iconLink" /></template>
          <template #trailing><OnyxSystemButton label="copy" :icon="iconCopy" /> </template>
        </OnyxInput>
      </template>
    </OnyxDialog>
  </div>
</template>
