<script lang="ts" setup>
import OnyxToast from "../OnyxToast/OnyxToast.vue";
import { useToast } from "./useToast";

const toastProvider = useToast();
</script>

<template>
  <dialog
    v-if="toastProvider.toasts.value.length"
    class="onyx-toast-provider"
    role="presentation"
    aria-live="polite"
    open
  >
    <OnyxToast v-for="{ id, ...toast } in toastProvider.toasts.value" :key="id" v-bind="toast" />
  </dialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-toast-provider {
  @include layers.component() {
    padding: 0;
    border: none;
    background: none;
    z-index: var(--onyx-z-index-notification);

    position: fixed;
    bottom: var(--onyx-spacing-xl);
    left: 50%;
    transform: translateX(-50%);
    overflow: auto;

    $max-size: calc(100% - 2 * var(--onyx-grid-margin));
    width: max-content;
    max-width: $max-size;
    max-height: $max-size;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--onyx-spacing-2xs);
  }
}
</style>
