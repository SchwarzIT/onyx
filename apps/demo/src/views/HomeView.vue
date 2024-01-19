<script lang="ts" setup>
import FormDemoMolecule from '@/components/molecules/FormDemoMolecule.vue';
import { ScuHeadline } from '@scu/vue';

const validFormData = {
  defaultInput: 'No Validation',
  requiredInput: 'Is filled',
  minlengthInput: 'Is long enough',
  maxInput: 42,
  typeInput: 'john.doe@mail.schwarz',
  patternInput: 'only lowercase or space',
};
const invalidFormData = {
  defaultInput: 'No Validation',
  requiredInput: '',
  minlengthInput: '',
  maxInput: 9001,
  typeInput: 'NotAmail',
  patternInput: 'NO UPPERCASE ALLOWED',
};
</script>

<template>
  <div data-testid="home-view" class="page">
    <ScuHeadline element="h1">Valid example</ScuHeadline>
    <FormDemoMolecule :form-data="validFormData" />

    <br />
    <br />

    <ScuHeadline element="h1">Invalid example</ScuHeadline>
    <FormDemoMolecule :form-data="invalidFormData" />
  </div>
</template>
