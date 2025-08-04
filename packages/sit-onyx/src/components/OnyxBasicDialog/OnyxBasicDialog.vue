<script lang="ts" setup>
import { useGlobalEventListener, useOutsideClick, wasKeyPressed } from "@sit-onyx/headless";
import { computed, useTemplateRef, watch } from "vue";
import { useDensity } from "../../composables/density.js";
import { useVModel } from "../../composables/useVModel.js";
import type { Nullable } from "../../types/index.js";
import type { OnyxBasicDialogProps } from "./types.js";

const props = withDefaults(defineProps<OnyxBasicDialogProps>(), {
  modal: false,
  alert: false,
  alignment: "center",
  nonDismissible: false,
});

const emit = defineEmits<{
  "update:open": [open: Nullable<boolean>];
}>();

defineSlots<{
  /**
   * Dialog content. For accessibility purposes it is strongly recommended
   * to focus an element inside the dialog when it opens. The element will depend
   * on your use case (e.g. an input, button etc.).
   */
  default(): unknown;
}>();

const dialog = useTemplateRef("dialogRef");

const { densityClass } = useDensity(props);

const open = useVModel({ props, emit, key: "open", default: false });

/**
 * Shows the dialog either as default dialog or modal.
 */
const openDialog = () => {
  if (props.modal) dialog.value?.showModal();
  else dialog.value?.show();
};

// sync open state
watch([dialog, open], () => {
  if (open.value) openDialog();
  else dialog.value?.close();
});

watch(
  () => props.modal,
  () => {
    if (dialog.value?.open) {
      // when the modal prop is changed while the dialog is already open, an error would
      // be thrown so we need to close it first
      dialog.value.close();
      openDialog();
    }
  },
);

const content = useTemplateRef("contentRef");

useOutsideClick({
  inside: content,
  // modal dialog obscures other content and can be closed by outside click
  // non-modal dialog allows interactions with other elements without closing
  disabled: computed(() => !open.value || props.nonDismissible || !props.modal),
  onOutsideClick: () => emit("update:open", false),
});

useGlobalEventListener({
  type: "keydown",
  // modal dialog has native support for closing via `Escape`
  // non-modal dialog needs custom support for this
  disabled: computed(() => !open.value || props.nonDismissible),
  listener: (event) => wasKeyPressed(event, { key: "Escape" }) && emit("update:open", false),
});
</script>

<!-- eslint-disable-next-line vue/no-root-v-if -->
<template>
  <!-- do not use the @close event here since it would emit redundant events when we call .close() internally -->
  <!-- also we use cancel.prevent here so the dialog does not close automatically and is fully controlled by the "open" property -->
  <dialog
    v-if="props.open"
    ref="dialogRef"
    :class="[
      'onyx-component',
      densityClass,
      'onyx-truncation-multiline',
      'onyx-basic-dialog',
      { [`onyx-basic-dialog--${props.alignment}`]: props.alignment !== 'center' },
    ]"
    :aria-modal="props.modal"
    :aria-label="props.label"
    :role="props.alert ? 'alertdialog' : undefined"
    @cancel.prevent
  >
    <div ref="contentRef" class="onyx-basic-dialog__content">
      <slot></slot>
    </div>
  </dialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-basic-dialog {
  @include layers.component() {
    --onyx-basic-dialog-screen-gap: var(--onyx-grid-margin);
    --onyx-basic-dialog-border-radius: var(--onyx-radius-md);
    --onyx-basic-dialog-padding: var(--onyx-density-md) var(--onyx-density-lg);
    outline: none;
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    border-radius: var(--onyx-basic-dialog-border-radius);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    background-color: var(--onyx-color-base-background-blank);
    overflow: auto;
    z-index: var(--onyx-z-index-page-overlay);
    padding: 0;

    $max-size: calc(100% - 2 * var(--onyx-basic-dialog-screen-gap));
    max-width: $max-size;
    max-height: $max-size;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;

    &::backdrop {
      background-color: var(--onyx-color-component-opacity-backdrop);
    }

    &:modal {
      z-index: var(--onyx-z-index-app-overlay);
      border: none;
    }

    &--left,
    &--right {
      --onyx-basic-dialog-screen-gap: var(--onyx-density-xs);
      transform: none;
      height: 100%;
    }

    &--left {
      left: var(--onyx-basic-dialog-screen-gap);
      margin-left: 0;
    }

    &--right {
      left: unset;
      right: var(--onyx-basic-dialog-screen-gap);
    }

    &__content {
      padding: var(--onyx-basic-dialog-padding);
      width: inherit;
    }
  }
}
.dark .onyx-basic-dialog:modal {
  outline: var(--onyx-spacing-5xs) solid var(--onyx-color-component-border-neutral);
}
</style>
