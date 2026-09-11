<script lang="ts" setup>
import { OnyxBottomBar, OnyxButton, OnyxModal } from "sit-onyx";
import { ref } from "vue";

const open = ref(false);
</script>

<template>
  <div>
    <OnyxButton label="Show modal" @click="open = true" />

    <OnyxModal v-model:open="open" class="modal" label="Example modal">
      <div class="modal__content">This is an example modal.</div>

      <template #footer>
        <OnyxBottomBar>
          <OnyxButton label="Close" color="neutral" mode="plain" @click="open = false" />
          <OnyxButton label="Save" />
        </OnyxBottomBar>
      </template>
    </OnyxModal>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  width: 32rem;

  &__content {
    padding: var(--onyx-density-xl) var(--onyx-modal-padding-inline);
  }
}
</style>
