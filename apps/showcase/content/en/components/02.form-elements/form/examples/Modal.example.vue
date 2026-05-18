<script lang="ts" setup>
import { OnyxBottomBar, OnyxButton, OnyxForm, OnyxInput, OnyxModal, OnyxStepper } from "sit-onyx";
import { ref, useId } from "vue";

const isModalOpen = ref(false);
const state = ref<{ name?: string; age?: number }>({});

const formId = useId();

const handleSubmit = () => {
  // your logic here...
  // the submit is only called when all validations have passed
  window.alert(`Form submitted: ${JSON.stringify(state.value, null, 2)}`);
};
</script>

<template>
  <OnyxButton label="Open modal" @click="isModalOpen = true" />

  <OnyxModal v-model:open="isModalOpen" class="modal" label="Example modal label">
    <OnyxForm :id="formId" class="onyx-grid modal__content" @submit.prevent="handleSubmit">
      <OnyxInput
        v-model="state.name"
        class="onyx-grid-span-4"
        label="Name"
        :minlength="3"
        :maxlength="64"
        required
        with-counter
      />
      <OnyxStepper
        v-model="state.age"
        class="onyx-grid-span-4"
        label="Age"
        :min="18"
        :maxlength="99"
        required
      />
    </OnyxForm>

    <template #footer>
      <OnyxBottomBar>
        <OnyxButton label="Cancel" color="neutral" mode="plain" @click="isModalOpen = false" />
        <OnyxButton label="Submit" type="submit" :form="formId" />
      </OnyxBottomBar>
    </template>
  </OnyxModal>
</template>

<style lang="scss" scoped>
.modal {
  width: 24rem;
  container-type: inline-size;

  &__content {
    padding: var(--onyx-density-xl) var(--onyx-modal-padding-inline);
  }
}
</style>
