<script lang="ts" setup>
import { ref } from "vue";
import { OnyxButton, OnyxForm, OnyxInput, OnyxStepper, useToast } from "../../..";

type State = {
  band?: string;
  password?: string;
  stepper?: number;
};

const toast = useToast();

const state = ref<State>({
  band: "Que2en",
  password: "incorrect",
  stepper: 42,
});

const handleReset = () => {
  state.value = {};
};

const handleSubmit = () => {
  // do something with your data here
  toast.show({
    headline: "Form submitted",
    description: JSON.stringify(state.value),
    color: "success",
  });
};
</script>

<template>
  <OnyxForm class="form" @reset="handleReset" @submit.prevent="handleSubmit">
    <OnyxInput v-model="state.band" label="Favorite band" :pattern="/[A-Za-z ]+/" />
    <OnyxInput v-model="state.password" label="Favorite password" type="password" />
    <OnyxStepper v-model="state.stepper" label="Number of hairs" :min="0" />

    <div class="form__actions">
      <OnyxButton label="Reset" mode="outline" type="reset" />
      <OnyxButton label="Submit" type="submit" />
    </div>
  </OnyxForm>
</template>

<style lang="scss" scoped>
.form {
  max-width: 12rem;
  display: flex;
  flex-direction: column;
  gap: var(--onyx-grid-gutter);

  &__actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--onyx-density-xs);
  }
}
</style>
