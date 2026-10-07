<script lang="ts" setup>
import { OnyxButton, OnyxCard, OnyxModal } from "sit-onyx";
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <div>
    <OnyxButton label="Show modal" @click="isOpen = true" />

    <OnyxModal v-model:open="isOpen" class="modal" label="Example modal">
      <div class="modal__content">
        <div class="onyx-grid">
          <OnyxCard class="grid-element onyx-grid-span-2">2</OnyxCard>
          <OnyxCard class="grid-element onyx-grid-span-2">2</OnyxCard>
          <OnyxCard class="grid-element onyx-grid-span-3">3</OnyxCard>
          <OnyxCard class="grid-element onyx-grid-span-1">1</OnyxCard>
          <OnyxCard class="grid-element onyx-grid-span-4">4</OnyxCard>
        </div>
      </div>
    </OnyxModal>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  width: 32rem;
  container-type: inline-size; // this is needed so when using the onyx grid, it uses the actual modal width to determine the breakpoint

  &__content {
    padding: var(--onyx-density-xl) var(--onyx-modal-padding-inline);
  }

  .grid-element {
    text-align: center;
  }
}
</style>
