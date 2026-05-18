<script lang="ts" setup>
import { OnyxButton, OnyxForm, OnyxInput, OnyxStepper } from "sit-onyx";
import { ref } from "vue";

const isLoading = ref(true);

const handleSubmit = () => {
  // your logic here...
};
</script>

<template>
  <OnyxForm class="onyx-grid" :disabled="isLoading" @submit.prevent="handleSubmit">
    <OnyxInput class="onyx-grid-span-4" label="Email" type="email" required />
    <OnyxStepper class="onyx-grid-span-4" label="Age" :min="18" :maxlength="99" />

    <OnyxButton class="onyx-grid-span-full" label="Submit" type="submit" :loading="isLoading" />
  </OnyxForm>
</template>
