<script lang="ts" setup>
import { iconCheckSmall, iconLink } from "@sit-onyx/icons";
import type { Editor } from "@tiptap/vue-3";
import { injectI18n, OnyxBottomBar, OnyxButton, OnyxDialog, OnyxForm, OnyxInput } from "sit-onyx";
import { ref, useId, watch } from "vue";
import OnyxEditorToolbarAction from "../OnyxEditorToolbarAction/OnyxEditorToolbarAction.vue";

const props = defineProps<{
  editor?: Editor;
}>();

const { t } = injectI18n();
const id = useId();
const open = ref(false);

const state = ref({ label: "", href: "" });

watch(
  open,
  (isOpen) => {
    if (!isOpen) {
      // reset state if dialog closes
      state.value = { label: "", href: "" };
      // TODO: reset form validation
      return;
    }

    const href = props.editor?.getAttributes("link").href;
    const previousHref = href && typeof href === "string" ? href : undefined;
    if (previousHref) state.value.href = previousHref;

    // TODO: get select text and store it in the state
  },
  { immediate: true },
);

const handleSubmit = () => {
  const href = state.value.href.trim();
  if (!href) return removeLink();
  // TODO: add target
  props.editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
};

const removeLink = () => {
  props.editor?.chain().focus().extendMarkRange("link").unsetLink().run();
};
</script>

<template>
  <OnyxDialog v-model:open="open" class="dialog" label="Edit link">
    <template #trigger="{ trigger }">
      <OnyxEditorToolbarAction
        v-bind="trigger"
        label="Edit link"
        :icon="iconLink"
        :active="props.editor?.isActive('link')"
        :disabled="!props.editor?.can().chain().toggleLink().run()"
      />
    </template>

    <OnyxForm :id class="dialog__content" @submit.prevent="handleSubmit">
      <OnyxInput v-model="state.label" label="Displayed text" required />
      <OnyxInput v-model="state.href" label="Linked URL" type="url" required />
    </OnyxForm>

    <template #footer>
      <OnyxBottomBar density="compact">
        <OnyxButton :label="t('cancel')" color="neutral" mode="outline" @click="open = false" />
        <OnyxButton :label="t('apply')" :icon="iconCheckSmall" :form="id" type="submit" />
      </OnyxBottomBar>
    </template>
  </OnyxDialog>
</template>

<style lang="scss" scoped>
.dialog {
  &__content {
    padding: var(--onyx-density-md) var(--onyx-dialog-padding-inline);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-md);
  }

  :deep(.onyx-dialog__headline-content) {
    justify-content: flex-start;
  }
}
</style>
