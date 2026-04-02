<script lang="ts" setup>
import { Placeholder } from "@tiptap/extensions/placeholder";
import { EditorContent, mergeAttributes, useEditor } from "@tiptap/vue-3";
import {
  FORM_INJECTED_SYMBOL,
  injectI18n,
  OnyxUnstableFormElementV2,
  SKELETON_INJECTED_SYMBOL,
  useFormContext,
  useForwardProps,
  useVModel,
  type FormElementV2Tooltip,
} from "sit-onyx";
import { computed, provide, ref, useTemplateRef, watch, type StyleValue } from "vue";
import EditorToolbar from "./EditorToolbar.vue";
import { OnyxStarterKit } from "./extensions/starterKit.js";
import { TEXT_EDITOR_INJECTION_KEY, type OnyxTextEditorProps } from "./types.js";

const props = withDefaults(defineProps<OnyxTextEditorProps>(), {
  toolbar: () => ({ position: "top" }),
  disabled: FORM_INJECTED_SYMBOL,
  reserveMessageSpace: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  requiredMarker: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  extensions: () => [OnyxStarterKit],
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

const { t } = injectI18n();
const formContext = useFormContext(props);
const disabled = computed(() => formContext.disabled.value || props.loading);
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
      class: "onyx-form-element-v2__input onyx-text-editor__input",
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

/**
 * The Tiptap editor uses a contenteditable div so it does not support the native CSS ":invalid" for showing the error.
 * To workaround this, the track if the value has ever been changed and consider this as "touched" / interacted.
 */
const isTouched = ref(false);
watch(modelValue, () => (isTouched.value = true), { once: true });

/**
 * The Tiptap editor uses a contenteditable div so it does not support native form validation.
 * To workaround this, we determine if the editor is invalid manually.
 */
const error = computed<string | FormElementV2Tooltip | undefined>(() => {
  if (props.error) return props.error;

  // determine validations manually
  if (props.required && editor.value?.isEmpty) {
    return {
      label: t.value("validations.valueMissing.preview"),
      tooltipText: t.value("validations.valueMissing.fullError"),
    };
  }

  return undefined;
});

watch(
  [() => props.label, () => props.disableManualResize, editor, isTouched, error],
  () => {
    const attributes = editor.value?.options.editorProps.attributes;

    editor.value?.setOptions({
      editorProps: {
        attributes: (state) => {
          const currentAttributes =
            typeof attributes === "function" ? attributes(state) : (attributes ?? {});

          const classes: string[] = [];
          if (props.disableManualResize) classes.push("onyx-text-editor__input--no-resize");
          if (isTouched.value) classes.push("onyx-form-element-v2__input--touched");

          return mergeAttributes(currentAttributes, {
            "aria-label": props.label,
            class: classes,
            "aria-invalid": error.value ? "true" : "false",
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

const formElementV2Props = useForwardProps(props, OnyxUnstableFormElementV2);

/**
 * Current CSS variables for the autosize min/max height.
 */
const autosizeMinMaxStyles = computed<StyleValue>(() => {
  if (!props.autosize) return;
  const min = props.autosize.min ? Math.max(props.autosize.min, 2) : undefined; // ensure min is not smaller than 2
  const max = props.autosize.max;
  return {
    "--onyx-text-editor-autosize-min-rows": min,
    "--onyx-text-editor-autosize-max-rows": max ?? "unset",
  };
});

const autosizeValue = computed(() => {
  return editor.value?.getText({ blockSeparator: "\n" });
});

const formElement = useTemplateRef("formElement");
const toolbarTeleportTarget = computed(() => {
  const el = formElement.value?.$el as HTMLElement | undefined;
  return el?.querySelector(".onyx-form-element-v2__content");
});

defineExpose({
  /**
   * Tiptap editor instance.
   */
  editor,
});
</script>

<template>
  <OnyxUnstableFormElementV2
    v-bind="formElementV2Props"
    ref="formElement"
    :error
    :class="[
      'onyx-text-editor',
      { 'onyx-text-editor--toolbar-bottom': props.toolbar?.position === 'bottom' },
    ]"
    :style="autosizeMinMaxStyles"
  >
    <Teleport v-if="toolbarTeleportTarget" :to="toolbarTeleportTarget">
      <EditorToolbar :editor>
        <slot name="actions"> </slot>
      </EditorToolbar>
    </Teleport>

    <EditorContent class="onyx-text-editor__wrapper" :data-autosize-value="autosizeValue" :editor />
  </OnyxUnstableFormElementV2>
</template>

<style lang="scss">
@use "sit-onyx/src/styles/mixins/layers.scss";
@use "sit-onyx/src/styles/mixins/input.scss";

.onyx-text-editor {
  @include layers.component() {
    --onyx-text-editor-autosize-min-rows: 3;
    --onyx-text-editor-autosize-max-rows: 10;

    // calculated values
    --onyx-text-editor-min-height: calc(
      var(--onyx-text-editor-autosize-min-rows) * 1lh + 2 *
        var(--onyx-form-element-v2-padding-block)
    );
    --onyx-text-editor-max-height: calc(
      var(--onyx-text-editor-autosize-max-rows) * 1lh + 2 *
        var(--onyx-form-element-v2-padding-block)
    );

    // needed for correct skeleton height
    --onyx-form-element-v2-content-height: calc(1lh * var(--onyx-text-editor-autosize-min-rows));

    // remove max height and disable auto-sizing if user resizes the textarea manually
    &:has(.onyx-text-editor__input[style*="height"]) {
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
    max-width: 100%;

    &__wrapper {
      padding: 0;
      display: grid;
      width: 100%;
      height: 100%;

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

    .onyx-form-element-v2__input-container {
      width: 100%;
      align-items: flex-start; // top align slots (loading indicator etc.)
    }

    .onyx-form-element-v2__content {
      height: unset; // needed for autosize to work
      flex-direction: column-reverse;
    }

    &--toolbar-bottom {
      .onyx-form-element-v2__content {
        flex-direction: column;
      }

      // needed so toolbar does not overlay the outline
      .onyx-form-element-v2__input-container:focus-within {
        z-index: 0;
      }
    }

    // styles for top toolbar
    &:not(&--toolbar-bottom) {
      .onyx-form-element-v2__input-container {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }

    // styles for bottom toolbar
    &--toolbar-bottom {
      .onyx-form-element-v2__input-container {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    /**
     * Styles that are shared between the <textarea> and the ::after element of the wrapper
     * that is used for the autosize feature.
     */
    &__wrapper:after,
    &__input {
      grid-area: 1 / 1;
      height: 100%;
      min-height: var(--onyx-text-editor-min-height);
      max-height: var(--onyx-text-editor-max-height);
      padding: var(--onyx-form-element-v2-padding-block) var(--onyx-form-element-v2-padding-inline);
      word-break: break-word;
    }

    &__input {
      @include content-styles();
      resize: vertical;
      overflow-y: auto;
      overflow-x: unset;
      white-space: pre-line;

      &--no-resize {
        resize: none;
      }
    }
  }
}
</style>
