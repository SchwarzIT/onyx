<script lang="ts" setup>
import { iconCopy, iconLink } from "@sit-onyx/icons";
import {
  OnyxButton,
  OnyxDialog,
  OnyxIcon,
  OnyxInput,
  OnyxUnstableFormElementAction,
} from "sit-onyx";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <OnyxDialog label="Url" non-dismissible button-text="Open Dialog">
    <template #trigger="{ trigger }">
      <OnyxButton label="Show dialog" v-bind="trigger" />
    </template>

    <template #headline>
      <OnyxInput v-model="value" label="Link" placeholder="https://onyx.schwarz" type="url">
        <template #leading>
          <OnyxIcon :icon="iconLink" />
        </template>

        <template #trailingIcons>
          <OnyxUnstableFormElementAction :icon="iconCopy" label="Copy" />
        </template>
      </OnyxInput>
    </template>
  </OnyxDialog>
</template>
