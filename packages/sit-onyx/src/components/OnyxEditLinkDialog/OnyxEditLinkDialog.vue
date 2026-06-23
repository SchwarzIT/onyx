<script lang="ts" setup>
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
import { useOutsideClick } from "@sit-onyx/headless";
import { iconCheckSmall, iconLink } from "@sit-onyx/icons";
import { computed, ref, useId, useTemplateRef, watch } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxBottomBar from "../OnyxBottomBar/OnyxBottomBar.vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxDialog from "../OnyxDialog/OnyxDialog.vue";
import OnyxForm from "../OnyxForm/OnyxForm.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import type { EditLinkValue, OnyxEditLinkDialogProps } from "./types.js";

const props = withDefaults(defineProps<OnyxEditLinkDialogProps>(), {
  open: undefined,
  modelValue: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when the dialog is opened or closed.
   */
  "update:open": [value: boolean];
  /**
   * Emitted when the value is updated.
   */
  "update:modelValue": [value?: EditLinkValue];
}>();

defineSlots<{
  /**
   * Element to trigger the dialog. Must bind the `trigger` params.
   */
  trigger?(params: { trigger: object }): unknown;
}>();

const { t } = injectI18n();
const id = useId();

const isOpen = useVModel({ props, emit, key: "open", default: false });

const state = ref<Partial<EditLinkValue>>({});
const modelValue = useVModel({ props, emit, key: "modelValue" });

watch(
  [isOpen, modelValue],
  () => {
    state.value = { ...modelValue.value };
  },
  { immediate: true, deep: true },
);

const dialogRef = useTemplateRef("dialogRef");

useOutsideClick({
  inside: dialogRef,
  onOutsideClick: () => (isOpen.value = false),
  disabled: computed(() => !isOpen.value),
});

const handleSubmit = () => {
  modelValue.value = state.value.href
    ? {
        href: state.value.href,
        label: state.value.label?.trim() || undefined,
      }
    : undefined;
};
</script>

<template>
  <OnyxDialog
    ref="dialogRef"
    v-model:open="isOpen"
    class="onyx-component onyx-link-dialog"
    :label="t('editor.link.edit')"
    density="compact"
  >
    <template #trigger="slotProps">
      <slot name="trigger" v-bind="slotProps"></slot>
    </template>

    <!-- using v-if here so the form validation is reset when the dialog closes -->
    <OnyxForm v-if="isOpen" :id class="onyx-link-dialog__content" @submit.prevent="handleSubmit">
      <OnyxInput v-model="state.href" :label="t('editor.link.link')" type="url" autofocus>
        <template #leadingIcons>
          <OnyxIcon :icon="iconLink" />
        </template>
      </OnyxInput>

      <OnyxInput v-model="state.label" :label="t('editor.link.text')" />
    </OnyxForm>

    <template #footer>
      <OnyxBottomBar density="compact">
        <OnyxButton :label="t('cancel')" color="neutral" mode="outline" @click="isOpen = false" />
        <OnyxButton :label="t('apply')" :icon="iconCheckSmall" :form="id" type="submit" />
      </OnyxBottomBar>
    </template>
  </OnyxDialog>
</template>

<style lang="scss">
@use "sit-onyx/src/styles/mixins/layers.scss";

.onyx-link-dialog {
  @include layers.component() {
    .onyx-basic-popover__dialog {
      width: 16rem;
    }

    &__content {
      padding: var(--onyx-density-md) var(--onyx-dialog-padding-inline);
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-md);
    }

    .onyx-dialog__headline-content {
      justify-content: flex-start;
    }
  }
}
</style>
