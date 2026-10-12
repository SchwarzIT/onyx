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
  <OnyxDialog class="dialog" label="Edit link">
    <template #trigger="{ trigger }">
      <OnyxButton label="Show dialog" v-bind="trigger" />
    </template>

    <div class="dialog__content">
      <OnyxInput
        v-model="value"
        label="URL"
        placeholder="https://onyx.schwarz"
        type="url"
        autofocus
      >
        <template #leading>
          <OnyxIcon :icon="iconLink" />
        </template>

        <template #trailingIcons>
          <OnyxUnstableFormElementAction :icon="iconCopy" label="Copy" />
        </template>
      </OnyxInput>
    </div>
  </OnyxDialog>
</template>

<style lang="scss" scoped>
.dialog {
  &__content {
    padding: var(--onyx-density-md) var(--onyx-dialog-padding-inline);
    color: var(--onyx-color-text-icons-info-intense);
    width: 20rem;
  }
}
</style>
