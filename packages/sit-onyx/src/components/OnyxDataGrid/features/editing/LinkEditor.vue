<script setup lang="ts">
import { iconLink } from "@sit-onyx/icons";
import { computed, ref } from "vue";
import { injectI18n } from "../../../../i18n/index.js";
import OnyxFormElementAction from "../../../OnyxFormElementAction/OnyxFormElementAction.vue";
import OnyxLinkDialog from "../../../OnyxLinkDialog/OnyxLinkDialog.vue";
import { parseLinkValue } from "../base/utils.js";

const props = defineProps<{
  /**
   * Value of the Link
   */
  modelValue?: unknown;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: { link: string; label?: string } | undefined];
}>();

const open = ref(false);
const { t } = injectI18n();

const linkData = computed(() => parseLinkValue(props.modelValue));
const currentLink = computed(() => linkData.value?.link);
const currentLabel = computed(() => linkData.value?.label);

const handleSubmit = (payload: { link: string; text: string }) => {
  if (!payload.link.trim()) {
    emit("update:modelValue", undefined);
  } else {
    emit("update:modelValue", { link: payload.link, label: payload.text });
  }
  open.value = false;
};
</script>

<template>
  <OnyxLinkDialog
    v-model:open="open"
    class="onyx-component onyx-link-editor"
    :initial-link="currentLink"
    :initial-text="currentLabel"
    link-required
    @apply="handleSubmit"
  >
    <template #trigger="{ trigger }">
      <div class="onyx-link-editor__display">
        <p class="onyx-link-editor__text">
          {{ currentLabel || currentLink || t("dataGrid.editing.addLink") }}
        </p>
        <OnyxFormElementAction
          :icon="iconLink"
          :label="currentLabel || currentLink || t('dataGrid.editing.addLink')"
          v-bind="trigger"
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
