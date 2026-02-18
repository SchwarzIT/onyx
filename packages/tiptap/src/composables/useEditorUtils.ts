import type { TextAlignOptions } from "@tiptap/extension-text-align";
import type { StarterKitOptions } from "@tiptap/starter-kit";
import type { Editor } from "@tiptap/vue-3";
import { computed, type Ref } from "vue";

export type HeadingOptions = Extract<StarterKitOptions["heading"], object>;
export type HeadingLevel = NonNullable<HeadingOptions["levels"]>[number];

/**
 * Composable for using several editor utilities.
 */
export const useEditorUtils = (editor: Ref<Editor | undefined>) => {
  const hasExtension = computed(() => {
    return (name: string) => {
      if (!editor.value) return true;
      return editor.value.extensionManager.extensions.some((e) => e.name === name);
    };
  });

  const hasTextExtension = computed(() => {
    return (alignment: TextAlignOptions["alignments"][number]) => {
      if (!editor.value) return true;
      const extension = editor.value.extensionManager.extensions.find(
        (e) => e.name === "textAlign",
      );
      if (!extension) return false;
      return (extension.options as TextAlignOptions).alignments.includes(alignment);
    };
  });

  const hasHeadingLevelExtension = computed(() => {
    return (level: number) => {
      if (!editor.value) return true;
      const extension = editor.value.extensionManager.extensions.find((e) => e.name === "heading");
      if (!extension) return false;
      return (extension.options as HeadingOptions).levels?.includes(level as HeadingLevel) ?? false;
    };
  });

  return { hasExtension, hasTextExtension, hasHeadingLevelExtension };
};
