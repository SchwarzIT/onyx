<script lang="ts" setup>
import { iconBulletList, iconList } from "@sit-onyx/icons";
import type { Editor } from "@tiptap/vue-3";
import { injectI18n } from "sit-onyx";
import { computed, toRef } from "vue";
import { useEditorUtils } from "../../../composables/useEditorUtils.js";
import OnyxEditorToolbarFlyout from "../../OnyxEditorToolbarFlyout/OnyxEditorToolbarFlyout.vue";
import type { EditorToolbarFlyoutOption } from "../../OnyxEditorToolbarFlyout/types.js";

const props = defineProps<{
  editor?: Editor;
}>();

const { t } = injectI18n();

const { hasExtension } = useEditorUtils(toRef(props, "editor"));

const options = computed(() => {
  const options: EditorToolbarFlyoutOption[] = [];

  if (hasExtension.value("bulletList")) {
    options.push({
      label: t.value("editor.lists.unorderedList"),
      icon: iconBulletList,
      active: props.editor?.isActive("bulletList"),
      onClick: () => props.editor?.chain().focus().toggleBulletList().run(),
    });
  }
  if (hasExtension.value("orderedList")) {
    options.push({
      label: t.value("editor.lists.orderedList"),
      icon: iconBulletList,
      active: props.editor?.isActive("orderedList"),
      onClick: () => props.editor?.chain().focus().toggleOrderedList().run(),
    });
  }

  return options;
});
</script>

<template>
  <OnyxEditorToolbarFlyout :label="t('editor.lists.lists')" :icon="iconList" :options />
</template>
