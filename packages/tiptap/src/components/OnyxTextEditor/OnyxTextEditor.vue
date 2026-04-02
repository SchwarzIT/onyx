<script lang="ts" setup>
import { Placeholder } from "@tiptap/extensions/placeholder";
import { EditorContent, mergeAttributes, useEditor } from "@tiptap/vue-3";
import {
  FORM_INJECTED_SYMBOL,
  getFormMessages,
  OnyxFormElement,
  useFormContext,
  useForwardProps,
  useVModel,
} from "sit-onyx";
import { computed, provide, watch } from "vue";
import EditorToolbar from "./EditorToolbar.vue";
import { OnyxStarterKit } from "./extensions/starterKit.js";
import { TEXT_EDITOR_INJECTION_KEY, type OnyxTextEditorProps } from "./types.js";

const props = withDefaults(defineProps<OnyxTextEditorProps>(), {
  toolbar: () => ({ position: "top" }),
  disabled: FORM_INJECTED_SYMBOL,
  extensions: () => [OnyxStarterKit],
  reserveMessageSpace: FORM_INJECTED_SYMBOL,
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
  actions?(): unknown;
}>();

const { disabled } = useFormContext(props);
provide(TEXT_EDITOR_INJECTION_KEY, { disabled });

const modelValue = useVModel({
  props,
  emit,
  key: "modelValue",
  default: "<p></p>",
});

// eslint-disable-next-line vue/no-setup-props-reactivity-loss -- documented in props JSDoc that extensions should not be changed at runtime
const editor = useEditor({
  content: modelValue.value,
  extensions: [
    ...props.extensions,
    Placeholder.configure({
      showOnlyWhenEditable: false, // same behavior as OnyxTextarea
      placeholder: () => props.placeholder ?? "",
    }),
  ],
  editorProps: {
    attributes: {
      class: "onyx-text-editor__native",
      role: "textbox",
    },
  },
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

watch(
  [() => props.autofocus, editor],
  () => {
    if (props.autofocus) editor.value?.commands.focus();
  },
  { immediate: true },
);

watch(
  [disabled, editor],
  () => {
    editor.value?.setEditable(!disabled.value);
  },
  { immediate: true },
);

watch(
  [() => props.label, () => props.disableManualResize, editor],
  () => {
    const attributes = editor.value?.options.editorProps.attributes;

    editor.value?.setOptions({
      editorProps: {
        attributes: (state) => {
          const currentAttributes =
            typeof attributes === "function" ? attributes(state) : (attributes ?? {});

          return mergeAttributes(currentAttributes, {
            "aria-label": props.label,
            class: props.disableManualResize ? "onyx-text-editor__native--no-resize" : undefined,
          });
        },
      },
    });
  },
  { immediate: true },
);

// needed to sync the placeholder property with the extension
watch(
  () => props.placeholder,
  () => {
    editor.value?.view.dispatch(editor.value.state.tr);
  },
);

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

const autosizeValue = computed(() => {
  return editor.value?.getText({ blockSeparator: "\n" });
});

defineExpose({
  /**
   * Tiptap editor instance.
   */
  editor,
});
</script>

<template>
  <OnyxFormElement
    v-bind="formElementProps"
    class="onyx-text-editor"
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
      <EditorToolbar :editor>
        <slot name="actions"> </slot>
      </EditorToolbar>

      <EditorContent
        class="onyx-text-editor__wrapper"
        :data-autosize-value="autosizeValue"
        :editor
      />
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

/** Applies styles to the editor (HTML) content */
@mixin content-styles() {
  blockquote {
    border-left: var(--onyx-spacing-5xs) solid var(--onyx-color-component-border-neutral);
    padding-left: var(--onyx-density-xs);
    color: var(--onyx-color-text-icons-neutral-medium);
  }

  /* placeholder, see: https://tiptap.dev/docs/editor/extensions/functionality/placeholder#additional-setup */
  p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;

    color: var(--onyx-color-text-icons-neutral-soft);
    font-weight: var(--onyx-font-weight-regular);
  }
}

.onyx-text-editor {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-text-editor",
      $vertical-padding: var(--onyx-text-editor-padding-block)
    );

    max-width: 100%;

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
      word-break: break-word;
    }

    &__native {
      @include content-styles();
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
  }
}
</style>
