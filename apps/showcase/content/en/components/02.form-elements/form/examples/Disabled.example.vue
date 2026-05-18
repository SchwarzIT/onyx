<script lang="ts" setup>
import { OnyxButton, OnyxForm, OnyxInput, OnyxStepper } from "sit-onyx";
import { ref } from "vue";

const state = ref<{ name?: string; age?: number }>({});
const isLoading = ref(true);

const handleSubmit = () => {
  // your logic here...
  // the submit is only called when all validations have passed
  window.alert(`Form submitted: ${JSON.stringify(state.value, null, 2)}`);
};
</script>

<template>
  <OnyxForm class="onyx-grid" :disabled="isLoading" @submit.prevent="handleSubmit">
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

    <OnyxButton class="onyx-grid-span-full" label="Submit" type="submit" :loading="isLoading" />
  </OnyxForm>
</template>
