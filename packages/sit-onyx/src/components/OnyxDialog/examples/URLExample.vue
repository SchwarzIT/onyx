<script lang="ts" setup>
import { iconCopy, iconLink } from "@sit-onyx/icons";
import OnyxInput from "../../OnyxInput/OnyxInput.vue";
import OnyxSystemButton from "../../OnyxSystemButton/OnyxSystemButton.vue";
import OnyxDialog from "../OnyxDialog.vue";
</script>

<template>
  <div>
    <OnyxDialog :open="true" label="Url" non-dismissible>
      <template #headline>
        <OnyxInput label="Url" placeholder="https://onyx.schwarz">
          <template #leading
            ><OnyxSystemButton label="next" class="navigation-button" :icon="iconLink"
          /></template>

          <template #trailing
            ><OnyxSystemButton label="next" class="navigation-button" :icon="iconCopy" />
          </template>
        </OnyxInput>
      </template>
    </OnyxDialog>
  </div>
</template>
