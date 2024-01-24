<script lang="ts" setup>
import FormDemoMolecule from "./molecules/FormDemoMolecule.vue";

const validFormData = {
  defaultInput: "No Validation",
  requiredInput: "Is filled",
  minlengthInput: "Is long enough",
  maxInput: 42,
  typeInput: "john.doe@mail.schwarz",
  patternInput: "only lowercase or space",
};
const invalidFormData = {
  defaultInput: "No Validation",
  requiredInput: "",
  minlengthInput: "",
  maxInput: 9001,
  typeInput: "NotAmail",
  patternInput: "NO UPPERCASE ALLOWED",
};
</script>

<template>
  <div data-testid="home-view" class="page">
    <h1 element="h1">Initially Invalid example</h1>
    <FormDemoMolecule :form-data="invalidFormData" />

    <br />
    <hr />

    <h1 element="h1">Initially Valid example</h1>
    <FormDemoMolecule :form-data="validFormData" />
  </div>
</template>
