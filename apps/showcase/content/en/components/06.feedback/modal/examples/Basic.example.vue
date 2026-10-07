<script lang="ts" setup>
import { OnyxBottomBar, OnyxButton, OnyxModal } from "sit-onyx";
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <div>
    <OnyxButton label="Show modal" @click="isOpen = true" />

    <OnyxModal v-model:open="isOpen" class="modal" label="Example modal">
      <template #description> This is an example description about the modal. </template>

      <div class="modal__content">
        Note: The modal component is fully flexible. It can be adjusted with any content.
      </div>

      <template #footer>
        <OnyxBottomBar>
          <OnyxButton label="Button" color="neutral" mode="plain" @click="isOpen = false" />
          <OnyxButton label="Button" @click="isOpen = false" />
        </OnyxBottomBar>
      </template>
    </OnyxModal>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  width: 32rem;
  container-type: inline-size; // this is needed so when using the onyx grid, it uses the actual modal width to determine the breakpoint

  &__content {
    padding: var(--onyx-density-xl) var(--onyx-modal-padding-inline);
    color: var(--onyx-color-text-icons-info-intense);
  }
}
</style>
