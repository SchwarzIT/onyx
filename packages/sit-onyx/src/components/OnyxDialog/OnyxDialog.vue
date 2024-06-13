<script lang="ts" setup>
import { ref, watch } from "vue";
import { useDensity } from "../../composables/density";
import type { OnyxDialogProps } from "./types";

const props = withDefaults(defineProps<OnyxDialogProps>(), {
  open: false,
  modal: false,
  alert: false,
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

const dialogRef = ref<HTMLDialogElement>();
const { densityClass } = useDensity(props);

/**
 * Shows the dialog either as default dialog or modal.
 */
const openDialog = () => {
  if (props.modal) dialogRef.value?.showModal();
  else dialogRef.value?.show();
};

// sync open state
watch(
  [dialogRef, () => props.open],
  () => {
    if (props.open) openDialog();
    else dialogRef.value?.close();
  },
  { immediate: true },
);

watch(
  () => props.modal,
  () => {
    if (dialogRef.value?.open) {
      // when the modal prop is changed while the dialog is already open, an error would
      // be thrown so we need to close it first
      dialogRef.value.close();
      openDialog();
    }
  },
);
</script>

<template>
  <!-- do not use the @close event here since it would emit redundant events when we call .close() internally -->
  <!-- also we use cancel.prevent here so the dialog does not close automatically and is fully controlled by the "open" property -->
  <dialog
    ref="dialogRef"
    :class="['onyx-dialog', densityClass]"
    :aria-modal="props.modal"
    :aria-label="props.label"
    :role="props.alert ? 'alertdialog' : undefined"
    @cancel.prevent="emit('close')"
  >
    <slot v-if="props.open"></slot>
  </dialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/density.scss";

.onyx-dialog {
  @include density.compact {
    --onyx-dialog-padding: var(--onyx-spacing-md);
  }
  @include density.default {
    --onyx-dialog-padding: var(--onyx-spacing-lg);
  }
  @include density.cozy {
    --onyx-dialog-padding: var(--onyx-spacing-xl);
  }

  @include layers.component() {
    --backdrop-opacity: 0.15;

    outline: none;
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
    border-radius: var(--onyx-radius-md);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    padding: var(--onyx-dialog-padding);
    background-color: var(--onyx-color-base-background-blank);

    $max-size: calc(100% - 2 * var(--onyx-grid-margin));
    max-width: $max-size;
    max-height: $max-size;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &::backdrop {
      background-color: rgba(0, 0, 0, var(--backdrop-opacity));
    }

    .dark & {
      --backdrop-opacity: 0.6;
    }
  }
}
</style>
