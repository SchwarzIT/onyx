<script lang="ts" setup>
import { OnyxBottomBar, OnyxButton, OnyxForm, OnyxInput, OnyxModal, OnyxStepper } from "sit-onyx";
import { ref, useId, watch } from "vue";

type FormState = {
  email: string;
  age?: number;
};

const isOpen = ref(false);
const formId = useId();
const state = ref<Partial<FormState>>({});

// make sure to reset the state so there is not leftover data if e.g. re-opening the modal
watch(isOpen, () => {
  if (isOpen.value) {
    state.value = {};
  }
});

const handleSubmit = () => {
  // when passing the data to other components, you most likely want to make a copy of the data
  // so the object is not passed by reference to avoid side effects
  // the type cast is considered safe since the submit is only triggered when all required validations is passed
  const data = structuredClone(state.value) as FormState;

  window.alert(`Form submitted: ${JSON.stringify(data, null, 2)}`);
};
</script>

<template>
  <OnyxButton label="Open modal" @click="isOpen = true" />

  <OnyxModal v-model:open="isOpen" class="modal" label="Example modal label">
    <OnyxForm
      :id="formId"
      class="onyx-grid modal__content"
      reserve-message-space
      @submit.prevent="handleSubmit"
    >
      <!-- tip: use autofocus on the first form element so the user can directly start typing after opening the modal -->
      <OnyxInput
        v-model="state.email"
        class="onyx-grid-span-4"
        label="Email"
        type="email"
        required
        autofocus
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
        <OnyxButton label="Cancel" color="neutral" mode="plain" @click="isOpen = false" />
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
