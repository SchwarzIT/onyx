<script lang="ts" setup>
import { OnyxButton, OnyxForm, OnyxInput, OnyxStepper } from "sit-onyx";
import { ref } from "vue";

type FormState = {
  email: string;
  age?: number;
};

const getDefaultValue = (): Partial<FormState> => ({ email: "jane.doe@example.com" });
const state = ref<Partial<FormState>>(getDefaultValue());

const handleSubmit = () => {
  // your logic here...
};

/** The reset key is needed so Vue force re-renders the whole form so the components, validations etc. are correctly reset */
const resetKey = ref(0);

const handleReset = () => {
  // reset the state to your required defaults here (e.g. empty or with some pre-filled initial values)
  state.value = getDefaultValue();
  resetKey.value++;
};
</script>

<template>
  <OnyxForm
    :key="resetKey"
    class="onyx-grid"
    @submit.prevent="handleSubmit"
    @reset.prevent="handleReset"
  >
    <OnyxInput v-model="state.email" class="onyx-grid-span-4" label="Email" type="email" required />
    <OnyxStepper
      v-model="state.age"
      class="onyx-grid-span-4"
      label="Age"
      :min="18"
      :maxlength="99"
    />

    <div class="onyx-grid-span-full actions">
      <OnyxButton label="Reset" type="reset" color="neutral" mode="plain" />
      <OnyxButton label="Submit" type="submit" />
    </div>
  </OnyxForm>
</template>

<style lang="scss" scoped>
.actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--onyx-density-xs);
}
</style>
