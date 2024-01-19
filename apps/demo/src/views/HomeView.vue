<script lang="ts" setup>
import FormDemoMolecule from '@/components/molecules/FormDemoMolecule.vue';
import { ScuHeadline } from '@scu/vue';

const validFormData = {
  defaultInput: { modelValue: 'No Validation' },
  requiredInput: { modelValue: 'Is filled' },
  minlengthInput: { modelValue: 'Is long enough' },
  maxInput: { modelValue: 42 },
  typeInput: { modelValue: 'john.doe@mail.schwarz' },
  patternInput: { modelValue: 'only lowercase or space' },
};
const invalidFormData = {
  defaultInput: { modelValue: 'No Validation' },
  requiredInput: { modelValue: '' },
  minlengthInput: { modelValue: '' },
  maxInput: { modelValue: 9001 },
  typeInput: { modelValue: 'NotAmail' },
  patternInput: { modelValue: 'NO UPPERCASE ALLOWED' },
};
</script>

<template>
  <div data-testid="home-view" class="page">
    <ScuHeadline element="h1">Valid example</ScuHeadline>
    <FormDemoMolecule :form-data="validFormData" />

    <ScuHeadline element="h1">Invalid example</ScuHeadline>
    <!-- <FormDemoMolecule :form-data="invalidFormData" /> -->
  </div>
</template>
