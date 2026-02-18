<script lang="ts" setup>
import { iconH1, iconH2, iconH3, iconH4, iconParagraphText } from "@sit-onyx/icons";
import type { Editor } from "@tiptap/vue-3";
import { injectI18n } from "sit-onyx";
import type { EditorToolbarFlyoutOption } from "src/components/OnyxEditorToolbarFlyout/types.js";
import { computed, toRef } from "vue";
import { type HeadingLevel, useEditorUtils } from "../../../composables/useEditorUtils.js";
import OnyxEditorToolbarFlyout from "../../OnyxEditorToolbarFlyout/OnyxEditorToolbarFlyout.vue";

const props = defineProps<{
  editor?: Editor;
}>();

const { t } = injectI18n();

const { hasHeadingLevelExtension } = useEditorUtils(toRef(props, "editor"));

const toggleLevel = (level: number) => {
  props.editor
    ?.chain()
    .focus()
    .toggleHeading({ level: level as HeadingLevel })
    .run();
};

const isLevelActive = computed(() => {
  return (level: number) => props.editor?.isActive("heading", { level });
});

const ICONS = {
  1: iconH1,
  2: iconH2,
  3: iconH3,
  4: iconH4,
};

const options = computed(() => {
  const options: EditorToolbarFlyoutOption[] = [];

  for (let i = 0; i < 6; i++) {
    const level = i + 1;

    if (hasHeadingLevelExtension.value(level)) {
      options.push({
        label: t.value("editor.headings.level", { n: level }),
        icon: level in ICONS ? ICONS[level as keyof typeof ICONS] : undefined,
        active: isLevelActive.value(level),
        onClick: () => toggleLevel(level),
      });
    }
  }

  options.push({
    label: t.value("editor.headings.paragraph"),
    icon: iconParagraphText,
    active: false, // explicitly setting active to false because we do not want to highlight paragraph texts (since thats the default)
    onClick: () => props.editor?.chain().focus().setParagraph().run(),
  });

  return options;
});
</script>

<template>
  <OnyxEditorToolbarFlyout
    :label="t('editor.headings.headlines')"
    :icon="iconParagraphText"
    :options
  />
</template>
