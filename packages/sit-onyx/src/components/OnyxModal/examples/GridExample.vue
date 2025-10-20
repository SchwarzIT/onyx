<script lang="ts" setup>
import { ref } from "vue";
import { OnyxBottomBar, OnyxButton, OnyxModal } from "../../../index.js";

const isOpen = ref(false);
</script>

<template>
  <div>
    <OnyxButton label="Show modal" @click="isOpen = true" />

    <OnyxModal v-model:open="isOpen" label="Example grid modal" class="modal">
      <template #description> This is an example description about the dialog. </template>

      <div class="body">
        <span class="body__description">
          Important: To correctly use the Onyx Grid inside a modal, the modal container must have a
          fixed width and the Container Query property set to container-type: inline-size. This
          ensures the grid scales correctly based on the modal's width.
        </span>
        <div class="onyx-grid">
          <div class="grid-element onyx-grid-span-2">2</div>
          <div class="grid-element onyx-grid-span-2">2</div>
          <div class="grid-element onyx-grid-span-3">3</div>
          <div class="grid-element onyx-grid-span-1">1</div>
          <div class="grid-element onyx-grid-span-4">4</div>
        </div>
      </div>

      <template #footer>
        <OnyxBottomBar>
          <OnyxButton label="Close" color="neutral" mode="plain" @click="isOpen = false" />
          <OnyxButton label="Save" @click="isOpen = false" />
        </OnyxBottomBar>
      </template>
    </OnyxModal>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  /**
  * Setting width and container type for the onyx-gird
  */
  width: 30rem;
  container-type: inline-size;

  .body {
    padding: var(--onyx-density-xl) var(--onyx-modal-padding-inline);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-xl);
    &__description {
      color: var(--onyx-color-text-icons-info-intense);
      white-space: pre-line;
    }
    .grid-element {
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-400);
      padding: var(--onyx-spacing-xs);
      border-radius: var(--onyx-radius-sm);
      display: flex;
      justify-content: center;
    }
  }
}
</style>
