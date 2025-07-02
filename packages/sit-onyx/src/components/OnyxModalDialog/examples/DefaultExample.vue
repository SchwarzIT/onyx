<script lang="ts" setup>
import { ref } from "vue";
import { OnyxBottomBar, OnyxButton, OnyxModalDialog } from "../../../index.js";

const isOpen = ref(false);
</script>

<template>
  <div>
    <OnyxButton label="Show modal" @click="isOpen = true" />

    <OnyxModalDialog label="Example modal dialog" :open="isOpen" @close="isOpen = false">
      <template #description> This is an example description about the dialog. </template>

      <div class="modal">
        <span class="modal__description">
          Note: The modal dialog component is fully flexible. It can be adjusted with every content
          the project needs.
        </span>
      </div>

      <template #footer>
        <OnyxBottomBar>
          <OnyxButton label="Close" color="neutral" mode="plain" />
          <OnyxButton label="Save" />
        </OnyxBottomBar>
      </template>
    </OnyxModalDialog>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  padding: var(--onyx-density-xl) var(--onyx-modal-dialog-padding-inline);

  &__description {
    color: var(--onyx-color-text-icons-info-intense);
    white-space: pre-line;
  }
}
</style>
