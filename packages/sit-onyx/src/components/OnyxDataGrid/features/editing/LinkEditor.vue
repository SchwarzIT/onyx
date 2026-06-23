<script setup lang="ts">
import { iconLink } from "@sit-onyx/icons";
import { computed, ref } from "vue";
import { injectI18n } from "../../../../i18n/index.js";
import OnyxFormElementAction from "../../../OnyxFormElementAction/OnyxFormElementAction.vue";
import OnyxLinkDialog from "../../../OnyxLinkDialog/OnyxLinkDialog.vue";
import type { LinkValue } from "../../../OnyxLinkDialog/types.js";
import { parseLinkValue } from "../../../OnyxLinkDialog/utils.js";

const props = defineProps<{
  /**
   * Value of the link.
   */
  modelValue?: unknown;
}>();

const emit = defineEmits<{
  /**
   * Emitted when the link changes.
   */
  "update:modelValue": [value?: LinkValue];
}>();

const open = ref(false);
const { t } = injectI18n();

const link = computed(() => parseLinkValue(props.modelValue));

const handleUpdateValue = (newValue?: LinkValue) => {
  emit("update:modelValue", newValue);
  open.value = false;
};
</script>

<template>
  <OnyxLinkDialog
    v-model:open="open"
    class="onyx-component onyx-link-editor"
    :model-value="link"
    @update:model-value="handleUpdateValue"
  >
    <template #trigger="{ trigger }">
      <div class="onyx-link-editor__display">
        <p class="onyx-link-editor__text">
          {{ link?.label || link?.href || "-" }}
        </p>
        <OnyxFormElementAction
          v-bind="trigger"
          :label="t('editor.link.edit')"
          :icon="iconLink"
          density="compact"
        />
      </div>
    </template>
  </OnyxLinkDialog>
</template>

<style lang="scss">
.onyx-link-editor {
  width: 100%;

  &__display {
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
}
</style>
