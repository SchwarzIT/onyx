<script lang="ts" setup>
import { OnyxBottomBar, OnyxButton, OnyxForm, OnyxInput, OnyxModal, OnyxStepper } from "sit-onyx";
import { ref, useId } from "vue";

type FormState = {
  email: string;
  age?: number;
};

const isModalOpen = ref(false);
const state = ref<Partial<FormState>>({});

const formId = useId();

const handleSubmit = () => {
  // when passing the data to other components, you most likely want to make a copy of the data
  // so the object is not passed by reference to avoid side effects
  // the type cast is considered safe since the submit is only triggered when all required validations is passed
  const data = structuredClone(state.value) as FormState;

  window.alert(`Form submitted: ${JSON.stringify(data, null, 2)}`);
};
</script>

<template>
  <OnyxButton label="Open modal" @click="isModalOpen = true" />

  <OnyxModal v-model:open="isModalOpen" class="modal" label="Example modal label">
    <OnyxForm
      :id="formId"
      class="onyx-grid modal__content"
      reserve-message-space
      @submit.prevent="handleSubmit"
    >
      <OnyxInput
        v-model="state.email"
        class="onyx-grid-span-4"
        label="Email"
        type="email"
        required
      />
      <OnyxStepper
        v-model="state.age"
        class="onyx-grid-span-4"
        label="Age"
        :min="18"
        :maxlength="99"
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
