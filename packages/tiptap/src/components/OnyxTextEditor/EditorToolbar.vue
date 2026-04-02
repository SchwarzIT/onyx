<script lang="ts" setup>
import {
  iconAlignmentBlock,
  iconAlignmentCenter,
  iconAlignmentLeft,
  iconAlignmentRight,
  iconQuote,
  iconRedo,
  iconToolBold,
  iconToolItalic,
  iconToolStrike,
  iconToolUnderlined,
  iconUndo,
} from "@sit-onyx/icons";
import type { Editor } from "@tiptap/vue-3";
import { injectI18n } from "sit-onyx";
import { computed } from "vue";
import { useEditorUtils } from "../../composables/useEditorUtils.js";
import OnyxEditorToolbarAction from "../OnyxEditorToolbarAction/OnyxEditorToolbarAction.vue";
import OnyxEditorToolbarGroup from "../OnyxEditorToolbarGroup/OnyxEditorToolbarGroup.vue";
import HeadingToolbarAction from "./actions/HeadingToolbarAction.vue";
import LinkToolbarAction from "./actions/LinkToolbarAction.vue";
import ListToolbarAction from "./actions/ListToolbarAction.vue";

const props = defineProps<{
  editor?: Editor;
}>();

const slots = defineSlots<{
  /**
   * Optional slot to add custom actions to the toolbar.
   */
  default?(): unknown;
}>();

const { t } = injectI18n();
const { hasExtension, hasTextExtension } = useEditorUtils(computed(() => props.editor));
</script>

<template>
  <div class="onyx-text-editor__toolbar">
    <div class="onyx-text-editor__actions">
      <OnyxEditorToolbarGroup>
        <HeadingToolbarAction v-if="hasExtension('heading')" :editor />

        <ListToolbarAction
          v-if="hasExtension('bulletList') || hasExtension('orderedList')"
          :editor
        />
      </OnyxEditorToolbarGroup>

      <OnyxEditorToolbarGroup>
        <OnyxEditorToolbarAction
          v-if="hasExtension('bold')"
          :label="t('editor.bold')"
          :icon="iconToolBold"
          :active="editor?.isActive('bold')"
          :disabled="!editor?.can().chain().toggleBold().run()"
          @click="editor?.chain().focus().toggleBold().run()"
        />
        <OnyxEditorToolbarAction
          v-if="hasExtension('italic')"
          :label="t('editor.italic')"
          :icon="iconToolItalic"
          :active="editor?.isActive('italic')"
          :disabled="!editor?.can().chain().toggleItalic().run()"
          @click="editor?.chain().focus().toggleItalic().run()"
        />
        <OnyxEditorToolbarAction
          v-if="hasExtension('underline')"
          :label="t('editor.underline')"
          :icon="iconToolUnderlined"
          :active="editor?.isActive('underline')"
          :disabled="!editor?.can().chain().toggleUnderline().run()"
          @click="editor?.chain().focus().toggleUnderline().run()"
        />
        <OnyxEditorToolbarAction
          v-if="hasExtension('strike')"
          :label="t('editor.strike')"
          :icon="iconToolStrike"
          :active="editor?.isActive('strike')"
          :disabled="!editor?.can().chain().toggleStrike().run()"
          @click="editor?.chain().focus().toggleStrike().run()"
        />
      </OnyxEditorToolbarGroup>

      <OnyxEditorToolbarGroup>
        <OnyxEditorToolbarAction
          v-if="hasTextExtension('left')"
          :label="t('editor.alignments.left')"
          :icon="iconAlignmentLeft"
          :active="editor?.isActive({ textAlign: 'left' })"
          :disabled="!editor?.can().chain().toggleTextAlign('left').run()"
          @click="editor?.chain().focus().toggleTextAlign('left').run()"
        />
        <OnyxEditorToolbarAction
          v-if="hasTextExtension('center')"
          :label="t('editor.alignments.center')"
          :icon="iconAlignmentCenter"
          :active="editor?.isActive({ textAlign: 'center' })"
          :disabled="!editor?.can().chain().toggleTextAlign('center').run()"
          @click="editor?.chain().focus().toggleTextAlign('center').run()"
        />
        <OnyxEditorToolbarAction
          v-if="hasTextExtension('right')"
          :label="t('editor.alignments.right')"
          :icon="iconAlignmentRight"
          :active="editor?.isActive({ textAlign: 'right' })"
          :disabled="!editor?.can().chain().toggleTextAlign('right').run()"
          @click="editor?.chain().focus().toggleTextAlign('right').run()"
        />
        <OnyxEditorToolbarAction
          v-if="hasTextExtension('justify')"
          :label="t('editor.alignments.block')"
          :icon="iconAlignmentBlock"
          :active="editor?.isActive({ textAlign: 'justify' })"
          :disabled="!editor?.can().chain().toggleTextAlign('justify').run()"
          @click="editor?.chain().focus().toggleTextAlign('justify').run()"
        />
      </OnyxEditorToolbarGroup>

      <OnyxEditorToolbarGroup>
        <LinkToolbarAction v-if="hasExtension('link')" :editor />

        <OnyxEditorToolbarAction
          v-if="hasExtension('blockquote')"
          :label="t('editor.blockquote')"
          :icon="iconQuote"
          :active="editor?.isActive('blockquote')"
          :disabled="!editor?.can().chain().toggleBlockquote().run()"
          @click="editor?.chain().focus().toggleBlockquote().run()"
        />
      </OnyxEditorToolbarGroup>

      <OnyxEditorToolbarGroup v-if="slots.default">
        <slot></slot>
      </OnyxEditorToolbarGroup>
    </div>

    <div
      v-if="hasExtension('undoRedo')"
      class="onyx-text-editor__actions onyx-text-editor__actions--fixed"
    >
      <OnyxEditorToolbarAction
        :label="t('editor.undo')"
        :icon="iconUndo"
        :disabled="!editor?.can().chain().undo().run()"
        @click="editor?.chain().focus().undo().run()"
      />
      <OnyxEditorToolbarAction
        :label="t('editor.redo')"
        :icon="iconRedo"
        :disabled="!editor?.can().chain().redo().run()"
        @click="editor?.chain().focus().redo().run()"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use "sit-onyx/src/styles/mixins/layers.scss";
@use "sit-onyx/src/styles/mixins/input.scss";

.onyx-text-editor {
  @include layers.component() {
    &__toolbar {
      border: var(--onyx-form-element-v2-border-size) solid var(--onyx-form-element-v2-border-color);
      border-radius: inherit;
      color: var(--onyx-color-text-icons-neutral-medium);
      background-color: var(--onyx-color-base-background-tinted); // TODO: adjust this in Figma
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 100%;
      width: 100%;
    }

    // styles for top toolbar
    &:not(&--toolbar-bottom) {
      .onyx-text-editor__toolbar {
        border-bottom: none;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    // styles for bottom toolbar
    &--toolbar-bottom {
      .onyx-text-editor__toolbar {
        border-top: none;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: var(--onyx-density-xs);
      overflow: auto;
      padding: var(--onyx-form-element-v2-padding-block);

      &--fixed {
        overflow: visible;
      }
    }
  }
}
</style>
