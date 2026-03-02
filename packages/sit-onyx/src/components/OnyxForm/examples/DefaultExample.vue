<script lang="ts" setup>
import { OnyxButton, OnyxForm, OnyxInput, useToast } from "../../../index.js";

const toast = useToast();

const handleSubmit = () => {
  // your submit logic here
  // this function is only called when all validations passed so you can be sure that e.g. required fields are filled etc.
  toast.show({
    headline: "Form submitted",
    color: "success",
  });
};
</script>

<template>
  <OnyxForm class="form" @submit.prevent="handleSubmit">
    <OnyxInput label="Favorite band" pattern="/[A-Za-z ]+/" />
    <OnyxInput label="Favorite password" required type="password" />
    <OnyxInput label="Number of hairs" :min="0" />
    <OnyxButton label="Submit" type="submit" />
  </OnyxForm>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  max-width: 20rem; // only for this example
  gap: var(--onyx-grid-gutter);
}
</style>
