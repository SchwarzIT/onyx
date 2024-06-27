<script lang="ts" setup>
import OnyxToast from "../OnyxToast/OnyxToast.vue";
import { useToast } from "./useToast";

const toastProvider = useToast();
</script>

<template>
  <dialog class="onyx-toast-provider" open role="presentation" aria-live="assertive">
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
    bottom: var(--onyx-spacing-2xs); // TODO: check with ux;
    left: 50%;
    transform: translateX(-50%);
    overflow: auto;

    $max-size: calc(100% - 2 * var(--onyx-grid-margin));
    width: max-content;
    min-width: min(18rem, $max-size);
    max-width: min(40rem, $max-size);
    max-height: $max-size;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--onyx-spacing-2xs);
  }
}
</style>
