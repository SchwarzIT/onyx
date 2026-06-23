<script lang="ts" setup>
import { iconLink } from "@sit-onyx/icons";
import type { Editor } from "@tiptap/vue-3";
import { injectI18n, OnyxUnstableLinkDialog, type LinkValue } from "sit-onyx";
import { ref, watch } from "vue";
import OnyxEditorToolbarAction from "../../OnyxEditorToolbarAction/OnyxEditorToolbarAction.vue";

const props = defineProps<{
  editor?: Editor;
}>();

const { t } = injectI18n();
const open = ref(false);
const state = ref<LinkValue>({ href: "" });

watch(
  open,
  (isOpen) => {
    if (!isOpen) {
      // reset state if dialog closes
      state.value = { href: "" };
      return;
    }

    const href = props.editor?.getAttributes("link").href;
    const previousHref = href && typeof href === "string" ? href : undefined;
    if (previousHref) state.value.href = previousHref;

    if (props.editor) {
      const { from, to, empty } = props.editor.state.selection;
      const label = empty ? "" : props.editor.state.doc.textBetween(from, to);
      state.value.label = label;
    }
  },
  { immediate: true },
);

const handleUpdateValue = (newValue?: LinkValue) => {
  const href = newValue?.href.trim();
  const label = newValue?.label?.trim() || href;
  if (!href) return removeLink();

  props.editor
    ?.chain()
    .focus()
    .extendMarkRange("link")
    .insertContent([
      {
        type: "text",
        text: label,
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
    :model-value="state"
    @update:model-value="handleUpdateValue"
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
