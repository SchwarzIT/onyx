<script lang="ts" setup>
import { iconCheckSmall, iconCopy } from "@sit-onyx/icons";
import { ref, computed } from "vue";
import { OnyxUnstableFormElementAction, OnyxInput, useCopy, OnyxIcon } from "../../../index.js";

const textValue = ref("This text can be copied!");

const { copyStatus, copy: handleCopy } = useCopy({ source: textValue });

const successMessage = computed(() => {
  return copyStatus.value === "success" ? "Copied successfully!" : undefined;
});

const errorMessage = computed(() => {
  return copyStatus.value === "error" ? "Failed to copy." : undefined;
});
</script>

<template>
  <OnyxInput
    v-model="textValue"
    label="Copyable value"
    :success="successMessage"
    :error="errorMessage"
  >
    <template #trailingIcons>
      <OnyxUnstableFormElementAction
        v-if="textValue.length && copyStatus !== 'success'"
        class="onyx-input__copy"
        label="Copy to clipboard"
        :icon="iconCopy"
        @click="handleCopy"
      />
      <OnyxIcon v-if="copyStatus === 'success'" :icon="iconCheckSmall" color="success" />
    </template>
  </OnyxInput>
</template>
