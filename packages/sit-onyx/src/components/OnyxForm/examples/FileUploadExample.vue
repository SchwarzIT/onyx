<script lang="ts" setup>
import { ref } from "vue";
import { OnyxButton, OnyxFileUpload, OnyxForm, OnyxInput, useToast } from "../../../index.js";

type State = {
  band?: string;
  password?: string;
  stepper?: number;
};

const toast = useToast();

const state = ref<State>({
  band: "Queen",
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
    <OnyxFileUpload :multiple="true" :max-count="2" max-size="1MiB" size="medium" />

    <div class="form__actions">
      <OnyxButton label="Reset" mode="outline" type="reset" />
      <OnyxButton label="Submit" type="submit" />
    </div>
  </OnyxForm>
</template>

<style lang="scss" scoped>
.form {
  max-width: 25rem;
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
