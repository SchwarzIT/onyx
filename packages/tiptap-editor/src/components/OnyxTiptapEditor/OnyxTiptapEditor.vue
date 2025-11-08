<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import {
  getFormMessages,
  OnyxFormElement,
  OnyxSystemButton,
  useForwardProps,
  useVModel,
} from "sit-onyx";
import { computed, watch, watchEffect } from "vue";
import type { OnyxTiptapEditorProps } from "./types.js";

const props = defineProps<OnyxTiptapEditorProps>();

const emit = defineEmits<{
  /**
   * Emitted when the value of the editor changes.
   */
  "update:modelValue": [value: string];
}>();

const modelValue = useVModel({
  props,
  emit,
  key: "modelValue",
  default: "",
});

const editor = useEditor({
  content: modelValue.value,
  extensions: [StarterKit],
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
    <div>
      <div class="onyx-tiptap-editor__toolbar">
        <!-- TODO: replace with actual actions -->
        <OnyxSystemButton v-for="i in 3" :key="i" :label="`Action ${i}`" :icon="iconPlaceholder" />
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

    &__toolbar {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--onyx-density-xs);
      padding: var(--onyx-tiptap-editor-padding-block);
      border: var(--onyx-1px-in-rem) solid var(--border-color);
      border-bottom: none;
      background-color: var(--onyx-color-base-background-tinted); // TODO: adjust this in Figma
      border-top-left-radius: var(--onyx-radius-sm);
      border-top-right-radius: var(--onyx-radius-sm);
      color: var(--onyx-color-text-icons-neutral-medium);
    }
  }
}
</style>
