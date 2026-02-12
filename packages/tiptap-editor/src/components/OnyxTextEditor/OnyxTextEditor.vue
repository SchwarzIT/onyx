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
import { useEditorUtils } from "../../composables/useEditorUtils.js";
import OnyxEditorToolbarAction from "../OnyxEditorToolbarAction/OnyxEditorToolbarAction.vue";
import LinkToolbarAction from "./LinkToolbarAction.vue";
import ListToolbarAction from "./ListToolbarAction.vue";
import TextStylesToolbarAction from "./TextStylesToolbarAction.vue";
import type { OnyxTextEditorProps } from "./types.js";

const props = withDefaults(defineProps<OnyxTextEditorProps>(), {
  toolbar: () => ({ position: "top" }),
});

const emit = defineEmits<{
  /**
   * Emitted when the value of the editor changes.
   */
  "update:modelValue": [value: string];
}>();

const slots = defineSlots<{
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
  extensions: [
    StarterKit.configure({
      link: {
        openOnClick: false,
        defaultProtocol: "https",
        autolink: true,
        enableClickSelection: true,
      },
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
  ],
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
  const classes = ["onyx-text-editor__native"];
  if (props.disableManualResize) {
    classes.push("onyx-text-editor__native--no-resize");
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
    min ? `--onyx-text-editor-min-autosize-rows: ${min}` : "",
    `--onyx-text-editor-max-autosize-rows: ${max ?? "unset"}`,
  ];
});

const successMessages = computed(() => getFormMessages(props.success));
const message = computed(() => getFormMessages(props.message));

const { hasExtension, hasTextExtension } = useEditorUtils(editor);

defineExpose({
  /**
   * Tiptap editor instance.
   */
  editor,
});
</script>

<template>
  <OnyxFormElement
    class="onyx-text-editor"
    v-bind="formElementProps"
    :style="autosizeMinMaxStyles"
    :message
    :success-messages
  >
    <div
      :class="[
        'onyx-text-editor__body',
        { 'onyx-text-editor__body--reverse': props.toolbar?.position === 'bottom' },
      ]"
    >
      <div class="onyx-text-editor__toolbar">
        <div class="onyx-text-editor__actions">
          <div class="onyx-text-editor__group">
            <TextStylesToolbarAction v-if="hasExtension('heading')" :editor />

            <ListToolbarAction
              v-if="hasExtension('bulletList') || hasExtension('orderedList')"
              :editor
            />
          </div>

          <div class="onyx-text-editor__group">
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
          </div>

          <div class="onyx-text-editor__group">
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
          </div>

          <div class="onyx-text-editor__group">
            <LinkToolbarAction v-if="hasExtension('link')" :editor />
          </div>

          <div v-if="slots.toolbar" class="onyx-text-editor__group">
            <slot name="toolbar"></slot>
          </div>
        </div>

        <div class="onyx-text-editor__actions onyx-text-editor__actions--fixed">
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

      <EditorContent class="onyx-text-editor__wrapper" :data-autosize-value="modelValue" :editor />
    </div>
  </OnyxFormElement>
</template>

<style lang="scss">
@use "sit-onyx/src/styles/mixins/layers.scss";
@use "sit-onyx/src/styles/mixins/input.scss";

.onyx-text-editor,
.onyx-text-editor-skeleton {
  @include layers.component() {
    --onyx-text-editor-min-autosize-rows: 3;
    --onyx-text-editor-max-autosize-rows: 10;
    --onyx-text-editor-padding-block: var(--onyx-density-xs);

    --onyx-text-editor-min-height: calc(
      var(--onyx-text-editor-min-autosize-rows) * 1lh + 2 * var(--onyx-text-editor-padding-block)
    );
    --onyx-text-editor-max-height: calc(
      var(--onyx-text-editor-max-autosize-rows) * 1lh + 2 * var(--onyx-text-editor-padding-block)
    );

    // remove max height and disable auto-sizing if user resizes the textarea manually
    &:has(.onyx-text-editor__native[style*="height"]) {
      --onyx-text-editor-max-height: unset;

      .onyx-text-editor__wrapper::after {
        // workaround for [#1142](https://github.com/SchwarzIT/onyx/issues/1142)
        // `display: none` or changing "content" causes user resizing to be interrupted
        height: 0;
      }
    }
  }
}

.onyx-text-editor {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-text-editor",
      $vertical-padding: var(--onyx-text-editor-padding-block)
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
      min-height: var(--onyx-text-editor-min-height);
      max-height: var(--onyx-text-editor-max-height);
      padding: var(--onyx-text-editor-padding-block) var(--onyx-density-sm);
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

        .onyx-text-editor__toolbar {
          border-top: none;
          border-bottom: var(--onyx-1px-in-rem) solid var(--border-color);
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-bottom-left-radius: var(--border-radius);
          border-bottom-right-radius: var(--border-radius);
        }

        .onyx-text-editor__wrapper {
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
      padding: var(--onyx-text-editor-padding-block);

      &--fixed {
        overflow: visible;
      }
    }

    &__group {
      display: contents;

      &::after {
        content: "";
        background-color: var(--onyx-color-component-border-neutral);
        height: 1lh;
        width: var(--onyx-1px-in-rem);
      }

      // hide group / separator when group is empty / all features are disabled
      &:empty {
        display: none;
      }

      // hide separator for last group
      &:last-of-type,
      &:has(+ .onyx-text-editor__group:empty) {
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
