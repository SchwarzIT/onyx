<script lang="ts" setup>
import { iconLink } from "@sit-onyx/icons";
import type { Editor } from "@tiptap/vue-3";
import { injectI18n, OnyxUnstableLinkDialog } from "sit-onyx";
import { ref, watch } from "vue";
import OnyxEditorToolbarAction from "../../OnyxEditorToolbarAction/OnyxEditorToolbarAction.vue";

const props = defineProps<{
  editor?: Editor;
}>();

const { t } = injectI18n();
const open = ref(false);

const initialLink = ref("");
const initialText = ref("");

watch(
  open,
  (isOpen) => {
    if (!isOpen) {
      initialLink.value = "";
      initialText.value = "";
      return;
    }

    const href = props.editor?.getAttributes("link").href;
    if (href && typeof href === "string") {
      initialLink.value = href;
    }

    if (props.editor) {
      const { from, to, empty } = props.editor.state.selection;
      const text = empty ? "" : props.editor.state.doc.textBetween(from, to);
      initialText.value = text;
    }
  },
  { immediate: true },
);

const handleSubmit = (payload: { link: string; text: string }) => {
  const href = payload.link.trim();
  const text = payload.text.trim();

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
  <OnyxUnstableLinkDialog
    v-model:open="open"
    class="onyx-editor-link-action"
    :initial-link="initialLink"
    :initial-text="initialText"
    text-required
    @apply="handleSubmit"
  >
    <template #trigger="{ trigger }">
      <OnyxEditorToolbarAction
        v-bind="trigger"
        :label="t('editor.link.edit')"
        :icon="iconLink"
        :active="props.editor?.isActive('link')"
        :disabled="!props.editor?.can().chain().toggleLink().run()"
      />
    </template>
  </OnyxUnstableLinkDialog>
</template>
