<script setup lang="ts">
import { computed, ref } from "vue";
import { injectI18n } from "../../../../i18n/index.js";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import OnyxLinkDialog from "../../../OnyxLinkDialog/OnyxLinkDialog.vue";
import { parseLinkValue } from "../renderer.js";

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
const currentLink = computed(() => linkData.value.link);
const currentLabel = computed(() => linkData.value.label);

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
      <OnyxButton
        class="onyx-link-editor__button"
        :label="currentLabel || currentLink || t('dataGrid.editing.addLink')"
        mode="plain"
        v-bind="trigger"
      />
    </template>
  </OnyxLinkDialog>
</template>

<style lang="scss">
.onyx-link-editor {
  width: 100%;
  &__button {
    width: 100%;
    justify-content: start;
  }
}
</style>
