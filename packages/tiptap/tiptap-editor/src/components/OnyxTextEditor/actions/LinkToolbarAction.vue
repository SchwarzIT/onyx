<script lang="ts" setup>
import { iconCheckSmall, iconLink } from "@sit-onyx/icons";
import type { Editor } from "@tiptap/vue-3";
import {
  injectI18n,
  OnyxBottomBar,
  OnyxButton,
  OnyxDialog,
  OnyxForm,
  OnyxIcon,
  OnyxInput,
} from "sit-onyx";
import { ref, useId, watch } from "vue";
import OnyxEditorToolbarAction from "../../OnyxEditorToolbarAction/OnyxEditorToolbarAction.vue";

const props = defineProps<{
  editor?: Editor;
}>();

const { t } = injectI18n();
const id = useId();
const open = ref(false);

const state = ref({ href: "", text: "" });

watch(
  open,
  (isOpen) => {
    if (!isOpen) {
      // reset state if dialog closes
      state.value = { href: "", text: "" };
      return;
    }

    const href = props.editor?.getAttributes("link").href;
    const previousHref = href && typeof href === "string" ? href : undefined;
    if (previousHref) state.value.href = previousHref;

    if (props.editor) {
      const { from, to, empty } = props.editor.state.selection;
      const text = empty ? "" : props.editor.state.doc.textBetween(from, to);
      state.value.text = text;
    }
  },
  { immediate: true },
);

const handleSubmit = () => {
  const href = state.value.href.trim();
  const text = state.value.text.trim();
  if (!href) return removeLink();

  props.editor
    ?.chain()
    .focus()
    .extendMarkRange("link")
    .insertContent([
      {
        type: "text",
        text,
        marks: [{ type: "link", attrs: { href } }],
      },
    ])
    .run();

  // configure editor to not include newly written text in the same link
  props.editor?.chain().setTextSelection(props.editor.state.selection.to).unsetMark("link").run();
  open.value = false;
};

const removeLink = () => {
  props.editor?.chain().focus().extendMarkRange("link").unsetLink().run();
  open.value = false;
};
</script>

<template>
  <OnyxDialog v-model:open="open" class="dialog" :label="t('editor.link.edit')" density="compact">
    <template #trigger="{ trigger }">
      <OnyxEditorToolbarAction
        v-bind="trigger"
        :label="t('editor.link.edit')"
        :icon="iconLink"
        :active="props.editor?.isActive('link')"
        :disabled="!props.editor?.can().chain().toggleLink().run()"
      />
    </template>

    <!-- using v-if here so the form validation is reset when the dialog closes -->
    <OnyxForm v-if="open" :id class="dialog__content" @submit.prevent="handleSubmit">
      <OnyxInput v-model="state.text" :label="t('editor.link.text')" required />

      <OnyxInput v-model="state.href" :label="t('editor.link.link')" type="url" autofocus>
        <template #leading>
          <OnyxIcon :icon="iconLink" />
        </template>
      </OnyxInput>
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
