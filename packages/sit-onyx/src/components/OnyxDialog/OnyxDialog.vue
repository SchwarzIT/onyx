<script lang="ts" setup>
import { useTemplateRef, watch } from "vue";
import { useDensity } from "../../composables/density";
import type { OnyxDialogProps } from "./types";
const props = withDefaults(defineProps<OnyxDialogProps>(), {
  open: false,
  modal: false,
  alert: false,
  alignment: "center",
  stayOpenOnBackdropClick: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the dialog should be closed (only when `modal` property is `true`).
   */
  close: [];
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
/**
 * Shows the dialog either as default dialog or modal.
 */
const openDialog = () => {
  if (props.modal) dialog.value?.showModal();
  else dialog.value?.show();
};

// sync open state
watch([dialog, () => props.open], () => {
  if (props.open) openDialog();
  else dialog.value?.close();
});

watch(dialog, (currentDialog) => {
  if (props.modal && !props.disableClosingOnBackdropClick) {
    currentDialog?.addEventListener("click", (e) => {
      const dialogDimensions = currentDialog.getBoundingClientRect();
      if (
        e.detail > 0 &&
        (e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom)
      ) {
        emit("close");
      }
    });
  }
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
      'onyx-dialog',
      densityClass,
      'onyx-truncation-multiline',
      props.alignment !== 'center' ? `onyx-dialog--${props.alignment}` : '',
    ]"
    :aria-modal="props.modal"
    :aria-label="props.label"
    :role="props.alert ? 'alertdialog' : undefined"
    @cancel.prevent="emit('close')"
  >
    <slot></slot>
  </dialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-dialog {
  @include layers.component() {
    --onyx-dialog-screen-gap: var(--onyx-grid-margin);
    --onyx-dialog-border-radius: var(--onyx-radius-md);
    outline: none;
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    border-radius: var(--onyx-dialog-border-radius);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    padding: var(--onyx-density-md) var(--onyx-density-lg);
    background-color: var(--onyx-color-base-background-blank);
    overflow: auto;
    z-index: var(--onyx-z-index-page-overlay);

    $max-size: calc(100% - 2 * var(--onyx-dialog-screen-gap));
    max-width: $max-size;
    max-height: $max-size;

    &::backdrop {
      background-color: var(--onyx-color-component-opacity-backdrop);
    }

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;

    &:modal {
      z-index: var(--onyx-z-index-app-overlay);
      border: none;
    }

    &--left,
    &--right {
      --onyx-dialog-screen-gap: var(--onyx-density-xs);
      transform: none;

      height: 100%;
    }

    &--left {
      left: var(--onyx-dialog-screen-gap);
      margin-left: 0;
    }

    &--right {
      left: unset;
      right: var(--onyx-dialog-screen-gap);
    }
  }
}
.dark .onyx-dialog:modal {
  outline: var(--onyx-spacing-5xs) solid var(--onyx-color-component-border-neutral);
}
</style>
