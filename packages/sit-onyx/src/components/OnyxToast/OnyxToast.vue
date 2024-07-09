<script lang="ts" setup>
import OnyxToastMessage from "../OnyxToastMessage/OnyxToastMessage.vue";
import { useToast } from "./useToast";

const toastProvider = useToast();
</script>

<template>
  <dialog
    v-if="toastProvider.toasts.value.length"
    class="onyx-toast"
    role="presentation"
    aria-live="polite"
    open
  >
    <OnyxToastMessage
      v-for="{ id, ...toast } in toastProvider.toasts.value"
      :key="id"
      v-bind="toast"
    />
  </dialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-toast {
  @include layers.component() {
    $bottom: var(--onyx-spacing-xl);

    padding: 0;
    border: none;
    background: none;
    z-index: var(--onyx-z-index-notification);

    position: fixed;
    bottom: $bottom;
    left: 50%;
    transform: translateX(-50%);
    overflow: auto;

    width: max-content;
    max-width: calc(100% - 2 * var(--onyx-grid-margin));
    max-height: calc(100% - 2 * $bottom);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--onyx-spacing-2xs);
  }
}
</style>
