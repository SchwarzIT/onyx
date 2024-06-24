<script lang="ts" setup>
import { ref } from "vue";
import OnyxToast from "../OnyxToast/OnyxToast.vue";
import { type ShowToastOptions } from "./useToast";

const toasts = ref<(ShowToastOptions & { createdAt: string })[]>([]);

const show = (toast: ShowToastOptions) => {
  toasts.value.unshift({ ...toast, createdAt: new Date().toISOString() });
};

const remove = (createdAt: string) => {
  toasts.value = toasts.value.filter((toast) => toast.createdAt !== createdAt);
};

defineExpose({ show });
</script>

<template>
  <dialog v-if="toasts.length" class="onyx-toast-provider" open role="presentation">
    <OnyxToast
      v-for="toast in toasts"
      :key="toast.createdAt"
      v-bind="toast"
      @close="remove(toast.createdAt)"
    />
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
    bottom: var(--onyx-spacing-md); // TODO: check with ux;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-md); // TODO: check with ux
  }
}
</style>
