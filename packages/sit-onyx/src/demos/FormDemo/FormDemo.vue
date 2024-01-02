<script lang="ts" setup>
import { TestInput } from "@/index";

/**
https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#using_built-in_form_validation
- required: Specifies whether a form field needs to be filled in before the form can be submitted.
- minlength and maxlength: Specifies the minimum and maximum length of textual data (strings).
- min and max: Specifies the minimum and maximum values of numerical input types.
- type: Specifies
whether the data needs to be a number, an email address, or some other specific preset type.
-pattern: Specifies a regular expression that defines a pattern the entered data needs to follow.

https://developer.mozilla.org/en-US/docs/Web/CSS/:valid
- The element matches the :valid or :invalid CSS pseudo-class

Build-in errors like:
https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/badInput
https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/valueMissing
https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/patternMismatch
- const input = document.getElementById("age");
- => input.validity.badInput
*/

const props = defineProps<{
  formData: {
    defaultInput: string;
    requiredInput: string;
    minlengthInput: string;
    maxInput: string;
    typeInput: string;
    patternInput: string;
  };
}>();

const emit = defineEmits<{
  submit: [data: object];
}>();

const { formData } = props;

const onSubmit = (event: Event) => {
  event.preventDefault();
  emit("submit", formData);
};
</script>

<template>
  <form @submit="onSubmit($event)">
    <TestInput v-model="formData.defaultInput" label="Default" />

    <TestInput v-model="formData.requiredInput" label="Requires a value" required></TestInput>

    <div>
      Info: minlength only triggers when the user has typed something, it ignores the initial value.
    </div>
    <TestInput
      v-model="formData.minlengthInput"
      label="Minlength 5"
      type="text"
      required
      :minlength="5"
    ></TestInput>

    <!-- formData.maxInput must currently be type string because TestInput requires string values, even though input is type number... -->
    <TestInput v-model="formData.maxInput" label="Max 9000" type="number" :max="9000"></TestInput>

    <TestInput v-model="formData.typeInput" label="Type mail" type="email"> </TestInput>

    <TestInput
      v-model="formData.patternInput"
      label="Pattern lowercase characters"
      pattern="[a-z ]*"
    ></TestInput>

    <button>Submit</button>
  </form>
</template>

<style lang="scss" scoped></style>
