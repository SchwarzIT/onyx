<script lang="ts" setup>
import { OnyxBottomBar, OnyxButton, OnyxModal } from "sit-onyx";
</script>

<template>
  <!-- modal="false" is important so the dialog can be placed inside the overview card instead of above the while viewport -->
  <OnyxModal class="modal" label="Modal" :modal="false" open>
    <template #description> Lorem ipsum dolor sit amet consectetur. </template>

    <div class="modal__content">
      Lorem ipsum dolor sit amet consectetur. Id neque viverra faucibus ullamcorper dui volutpat.
    </div>

    <template #footer>
      <OnyxBottomBar>
        <OnyxButton label="Button" color="neutral" mode="plain" />
        <OnyxButton label="Button" />
      </OnyxBottomBar>
    </template>
  </OnyxModal>
</template>

<style lang="scss" scoped>
.modal {
  zoom: 0.5;

  &__content {
    padding: var(--onyx-density-xl) var(--onyx-modal-padding-inline);
  }
}
</style>
