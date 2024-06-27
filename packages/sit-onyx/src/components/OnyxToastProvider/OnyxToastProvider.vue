<script lang="ts" setup>
import OnyxToast from "../OnyxToast/OnyxToast.vue";
import { useToast } from "./useToast";

const toastProvider = useToast();
</script>

<template>
  <dialog
    v-if="toastProvider.toasts.value.length"
    class="onyx-toast-provider"
    open
    role="presentation"
  >
    <OnyxToast v-for="toast in toastProvider.toasts.value" :key="toast.createdAt" v-bind="toast" />
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
    bottom: var(--onyx-spacing-2xs); // TODO: check with ux;
    left: 0;
    width: 100%;
    margin-inline: auto;

    $max-size: calc(100% - 2 * var(--onyx-grid-margin));
    max-width: $max-size;
    max-height: $max-size;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--onyx-spacing-2xs);
  }
}
</style>
