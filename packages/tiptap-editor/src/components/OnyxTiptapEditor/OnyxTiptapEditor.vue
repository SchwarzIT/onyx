<script lang="ts" setup>
import {
  iconAlignmentBlock,
  iconAlignmentCenter,
  iconAlignmentLeft,
  iconAlignmentRight,
  iconRedo,
  iconToolBold,
  iconToolItalic,
  iconToolStrike,
  iconToolUnderlined,
  iconUndo,
} from "@sit-onyx/icons";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import { getFormMessages, injectI18n, OnyxFormElement, useForwardProps, useVModel } from "sit-onyx";
import { computed, watch, watchEffect } from "vue";
import OnyxEditorToolbarAction from "../OnyxEditorToolbarAction/OnyxEditorToolbarAction.vue";
import type { OnyxTiptapEditorProps } from "./types.js";

const props = withDefaults(defineProps<OnyxTiptapEditorProps>(), {
  toolbar: () => ({ position: "top" }),
});

const emit = defineEmits<{
  /**
   * Emitted when the value of the editor changes.
   */
  "update:modelValue": [value: string];
}>();

defineSlots<{
  /**
   * Optional slot to add custom actions to the toolbar.
   */
  toolbar?(): unknown;
}>();

const { t } = injectI18n();

const modelValue = useVModel({
  props,
  emit,
  key: "modelValue",
  default: "<p></p>",
});

const editor = useEditor({
  content: modelValue.value,
  extensions: [StarterKit, TextAlign],
  onUpdate: () => {
    if (!editor.value) return;
    const newValue = editor.value.getHTML();
    if (newValue === modelValue.value) return;
    modelValue.value = newValue;
  },
});

watch([modelValue, editor], ([newValue]) => {
  if (!editor.value) return;
  if (newValue === editor.value.getHTML()) return;
  editor.value.commands.setContent(newValue);
});

// sync options
watchEffect(() => {
  const classes = ["onyx-tiptap-editor__native"];
  if (props.disableManualResize) {
    classes.push("onyx-tiptap-editor__native--no-resize");
  }

  editor.value?.setOptions({
    editable: !props.disabled,
    editorProps: {
      attributes: {
        class: classes.join(" "),
        "aria-label": props.label,
        title: props.label,
      },
    },
  });

  if (props.autofocus) editor.value?.commands.focus();
});

const formElementProps = useForwardProps(props, OnyxFormElement);

/**
 * Current CSS variables for the autosize min/max height.
 */
const autosizeMinMaxStyles = computed(() => {
  if (!props.autosize) return;
  const min = props.autosize.min ? Math.max(props.autosize.min, 2) : undefined; // ensure min is not smaller than 2
  const max = props.autosize.max;
  return [
    min ? `--onyx-tiptap-editor-min-autosize-rows: ${min}` : "",
    `--onyx-tiptap-editor-max-autosize-rows: ${max ?? "unset"}`,
  ];
});

const successMessages = computed(() => getFormMessages(props.success));
const message = computed(() => getFormMessages(props.message));

defineExpose({
  /**
   * Tiptap editor instance.
   */
  editor,
});
</script>

<template>
  <OnyxFormElement
    class="onyx-tiptap-editor"
    v-bind="formElementProps"
    :style="autosizeMinMaxStyles"
    :message
    :success-messages
  >
    <div
      :class="[
        'onyx-tiptap-editor__body',
        { 'onyx-tiptap-editor__body--reverse': props.toolbar?.position === 'bottom' },
      ]"
    >
      <div class="onyx-tiptap-editor__toolbar">
        <div class="onyx-tiptap-editor__actions">
          <OnyxEditorToolbarAction
            :label="t('editor.bold')"
            :icon="iconToolBold"
            :active="editor?.isActive('bold')"
            @click="editor?.chain().focus().toggleBold().run()"
          />
          <OnyxEditorToolbarAction
            :label="t('editor.italic')"
            :icon="iconToolItalic"
            :active="editor?.isActive('italic')"
            @click="editor?.chain().focus().toggleItalic().run()"
          />
          <OnyxEditorToolbarAction
            :label="t('editor.underline')"
            :icon="iconToolUnderlined"
            :active="editor?.isActive('underline')"
            @click="editor?.chain().focus().toggleUnderline().run()"
          />
          <OnyxEditorToolbarAction
            :label="t('editor.strike')"
            :icon="iconToolStrike"
            :active="editor?.isActive('strike')"
            @click="editor?.chain().focus().toggleStrike().run()"
          />
          <OnyxEditorToolbarAction
            :label="t('editor.alignments.left')"
            :icon="iconAlignmentLeft"
            :active="editor?.isActive({ textAlign: 'left' })"
            @click="editor?.chain().focus().toggleTextAlign('left').run()"
          />
          <OnyxEditorToolbarAction
            :label="t('editor.alignments.right')"
            :icon="iconAlignmentRight"
            :active="editor?.isActive({ textAlign: 'right' })"
            @click="editor?.chain().focus().toggleTextAlign('right').run()"
          />
          <OnyxEditorToolbarAction
            :label="t('editor.alignments.center')"
            :icon="iconAlignmentCenter"
            :active="editor?.isActive({ textAlign: 'center' })"
            @click="editor?.chain().focus().toggleTextAlign('center').run()"
          />
          <OnyxEditorToolbarAction
            :label="t('editor.alignments.block')"
            :icon="iconAlignmentBlock"
            :active="editor?.isActive({ textAlign: 'justify' })"
            @click="editor?.chain().focus().toggleTextAlign('justify').run()"
          />
          <slot name="toolbar"></slot>
        </div>

        <div class="onyx-tiptap-editor__actions onyx-tiptap-editor__actions--fixed">
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

      <EditorContent
        class="onyx-tiptap-editor__wrapper"
        :data-autosize-value="modelValue"
        :editor
      />
    </div>
  </OnyxFormElement>
</template>

<style lang="scss">
@use "sit-onyx/src/styles/mixins/layers.scss";
@use "sit-onyx/src/styles/mixins/input.scss";

.onyx-tiptap-editor,
.onyx-tiptap-editor-skeleton {
  @include layers.component() {
    --onyx-tiptap-editor-min-autosize-rows: 3;
    --onyx-tiptap-editor-max-autosize-rows: 10;
    --onyx-tiptap-editor-padding-block: var(--onyx-density-xs);

    --onyx-tiptap-editor-min-height: calc(
      var(--onyx-tiptap-editor-min-autosize-rows) * 1lh + 2 *
        var(--onyx-tiptap-editor-padding-block)
    );
    --onyx-tiptap-editor-max-height: calc(
      var(--onyx-tiptap-editor-max-autosize-rows) * 1lh + 2 *
        var(--onyx-tiptap-editor-padding-block)
    );

    // remove max height and disable auto-sizing if user resizes the textarea manually
    &:has(.onyx-tiptap-editor__native[style*="height"]) {
      --onyx-tiptap-editor-max-height: unset;

      .onyx-tiptap-editor__wrapper::after {
        // workaround for [#1142](https://github.com/SchwarzIT/onyx/issues/1142)
        // `display: none` or changing "content" causes user resizing to be interrupted
        height: 0;
      }
    }
  }
}

.onyx-tiptap-editor {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-tiptap-editor",
      $vertical-padding: var(--onyx-tiptap-editor-padding-block)
    );

    &__wrapper {
      padding: 0;
      height: unset;
      display: grid;
      border-top-left-radius: 0;
      border-top-right-radius: 0;

      // auto-resize, based on: https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas
      &::after {
        /* Note the weird space! Needed to prevent jumpy behavior */
        content: attr(data-autosize-value) " ";
        white-space: pre-wrap; // this is how textarea text behaves
        visibility: hidden; // hidden from view, clicks, and screen readers
        overflow-wrap: anywhere;
        overflow-y: hidden;
      }
    }

    /**
     * Styles that are shared between the <textarea> and the ::after element of the wrapper
     * that is used for the autosize feature.
     */
    &__wrapper:after,
    &__native {
      grid-area: 1 / 1;
      height: 100%;
      min-height: var(--onyx-tiptap-editor-min-height);
      max-height: var(--onyx-tiptap-editor-max-height);
      padding: var(--onyx-tiptap-editor-padding-block) var(--onyx-density-sm);
    }

    &__native {
      resize: vertical;
      overflow-y: auto;

      &--no-resize {
        resize: none;
      }
    }

    &__body {
      display: flex;
      flex-direction: column;

      &--reverse {
        flex-direction: column-reverse;

        .onyx-tiptap-editor__toolbar {
          border-top: none;
          border-bottom: var(--onyx-1px-in-rem) solid var(--border-color);
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-bottom-left-radius: var(--border-radius);
          border-bottom-right-radius: var(--border-radius);
        }

        .onyx-tiptap-editor__wrapper {
          border-top-left-radius: var(--border-radius);
          border-top-right-radius: var(--border-radius);
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    }

    &__toolbar {
      border: var(--onyx-1px-in-rem) solid var(--border-color);
      border-bottom: none;
      border-top-left-radius: var(--border-radius);
      border-top-right-radius: var(--border-radius);
      color: var(--onyx-color-text-icons-neutral-medium);
      background-color: var(--onyx-color-base-background-tinted); // TODO: adjust this in Figma

      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: var(--onyx-density-xs);
      overflow: auto;
      padding: var(--onyx-tiptap-editor-padding-block);

      &--fixed {
        overflow: visible;
      }
    }
  }
}
</style>
