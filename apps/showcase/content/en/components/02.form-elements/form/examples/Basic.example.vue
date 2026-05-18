<script lang="ts" setup>
import { OnyxButton, OnyxForm, OnyxInput, OnyxStepper } from "sit-onyx";
import { ref } from "vue";

type FormState = {
  age: number;
  email: string;
};

const state = ref<Partial<FormState>>({});

const handleSubmit = () => {
  // when passing the data to other components, you most likely want to make a copy of the data
  // so the object is not passed by reference to avoid side effects
  // the type cast is considered safe since the submit is only triggered when all required validations is passed
  const data = structuredClone(state.value) as FormState;

  window.alert(`Form submitted: ${JSON.stringify(data, null, 2)}`);
};
</script>

<template>
  <OnyxForm class="onyx-grid" @submit.prevent="handleSubmit">
    <OnyxInput v-model="state.email" class="onyx-grid-span-4" label="Email" type="email" required />

    <OnyxStepper
      v-model="state.age"
      class="onyx-grid-span-4"
      label="Age"
      :min="18"
      :maxlength="99"
    />

    <OnyxButton class="onyx-grid-span-full" label="Submit" type="submit" />
  </OnyxForm>
</template>
