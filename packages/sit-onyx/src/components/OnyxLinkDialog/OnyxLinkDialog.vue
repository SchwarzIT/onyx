<script lang="ts" setup>
import { useOutsideClick } from "@sit-onyx/headless";
import { iconCheckSmall, iconLink } from "@sit-onyx/icons";

import { computed, ref, useId, useTemplateRef, watch } from "vue";
import { injectI18n } from "../../i18n/index.js";
import OnyxBottomBar from "../OnyxBottomBar/OnyxBottomBar.vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxDialog from "../OnyxDialog/OnyxDialog.vue";
import OnyxForm from "../OnyxForm/OnyxForm.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import type { OnyxLinkDialogProps } from "./types.js";

const props = withDefaults(defineProps<OnyxLinkDialogProps>(), {
  textRequired: false,
  linkRequired: false,
});

const emit = defineEmits<{
  "update:open": [value: boolean];
  apply: [value: { link: string; text: string }];
}>();

defineSlots<{
  trigger?(params: { trigger: object }): unknown;
}>();

const { t } = injectI18n();
const id = useId();

const state = ref({ href: "", text: "" });
const dialogRef = useTemplateRef("dialogRef");

useOutsideClick({
  inside: dialogRef,
  onOutsideClick() {
    handleOpenUpdate(false);
  },
  disabled: computed(() => !props.open),
});

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      state.value = {
        href: props.initialLink ?? "",
        text: props.initialText ?? "",
      };
    } else {
      state.value = { href: "", text: "" };
    }
  },
  { immediate: true },
);

const handleSubmit = () => {
  emit("apply", { link: state.value.href, text: state.value.text });
};

const handleOpenUpdate = (val: boolean) => {
  emit("update:open", val);
};
</script>

<template>
  <OnyxDialog
    ref="dialogRef"
    :open="open"
    class="onyx-component onyx-link-dialog"
    :label="t('editor.link.edit')"
    density="compact"
    @update:open="handleOpenUpdate"
  >
    <template #trigger="slotProps">
      <slot name="trigger" v-bind="slotProps"></slot>
    </template>

    <!-- using v-if here so the form validation is reset when the dialog closes -->
    <OnyxForm v-if="open" :id="id" class="onyx-link-dialog__content" @submit.prevent="handleSubmit">
      <OnyxInput v-model="state.text" :label="t('editor.link.text')" :required="textRequired" />

      <OnyxInput
        v-model="state.href"
        :label="t('editor.link.link')"
        type="url"
        autofocus
        :required="linkRequired"
      >
        <template #leadingIcons>
          <OnyxIcon :icon="iconLink" />
        </template>
      </OnyxInput>
    </OnyxForm>

    <template #footer>
      <OnyxBottomBar density="compact">
        <OnyxButton
          :label="t('cancel')"
          color="neutral"
          mode="outline"
          @click="handleOpenUpdate(false)"
        />
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
