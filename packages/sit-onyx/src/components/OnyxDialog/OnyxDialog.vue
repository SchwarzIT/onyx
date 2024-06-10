<script lang="ts" setup>
import { ref, watch } from "vue";
import { useDensity } from "../../composables/density";
import type { OnyxDialogProps } from "./types";

const props = withDefaults(defineProps<OnyxDialogProps>(), {
  open: false,
  modal: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the dialog should be closed.
   */
  close: [];
}>();

defineSlots<{
  /**
   * Dialog content.
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
      dialogRef.value.close();
      openDialog();
    }
  },
);
</script>

<template>
  <!-- do not use the @close event here since it would emit redundant events when we call .close() internally -->
  <dialog
    ref="dialogRef"
    :class="['onyx-dialog', densityClass]"
    :aria-modal="props.modal"
    :aria-label="props.label"
    @cancel.prevent="emit('close')"
  >
    <slot v-if="props.open"></slot>
  </dialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/density.scss";

.onyx-dialog {
  @include layers.component() {
    @include density.compact {
      --onyx-dialog-padding: var(--onyx-spacing-md);
    }
    @include density.default {
      --onyx-dialog-padding: var(--onyx-spacing-lg);
    }
    @include density.cozy {
      --onyx-dialog-padding: var(--onyx-spacing-xl);
    }

    border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
    outline: none;
    border-radius: var(--onyx-radius-md);
    box-shadow: var(--onyx-shadow-soft-bottom);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    padding: var(--onyx-dialog-padding);
    background-color: var(--onyx-color-base-background-blank);

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &::backdrop {
      background-color: color-mix(in srgb, var(--onyx-color-base-neutral-500), transparent 60%);
    }

    &:modal {
      box-shadow: none;
      border: none;
    }
  }
}
</style>
