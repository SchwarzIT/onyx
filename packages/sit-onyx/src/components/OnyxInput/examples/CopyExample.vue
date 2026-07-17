<script lang="ts" setup>
import { ref, computed } from "vue";
import { iconCheckSmall, iconCopy } from "@sit-onyx/icons";
import { OnyxUnstableFormElementAction, OnyxInput, useCopy } from "../../../index.js";

const textValue = ref("This text can be copied!");

const { copyStatus, copy: handleCopy } = useCopy({ source: () => textValue.value });

const successMessage = computed(() => {
  return copyStatus.value === "success" ? "Copied successfully!" : undefined;
});

const errorMessage = computed(() => {
  return copyStatus.value === "error" ? "Failed to copy." : undefined;
});
</script>

<template>
  <div class="copy-input-example">
    <OnyxInput
      v-model="textValue"
      label="Copyable value"
      :success="successMessage"
      :error="errorMessage"
    >
      <template #trailingIcons>
        <OnyxUnstableFormElementAction
          v-if="textValue.length"
          class="onyx-input__copy"
          :label="copyStatus === 'success' ? 'Copied' : 'Copy to clipboard'"
          :icon="copyStatus === 'success' ? iconCheckSmall : iconCopy"
          @click="handleCopy"
        />
      </template>
    </OnyxInput>
  </div>
</template>

<style lang="scss" scoped>
.copy-input-example {
  :deep(.onyx-input:has(.onyx-form-element-v2__message--success)) {
    .onyx-input__copy .onyx-form-element-action__button {
      color: var(--onyx-color-base-success-500);
    }
  }
}
</style>
