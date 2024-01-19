<script lang="ts" setup>
import { TestInput } from 'sit-onyx';
import { computed, ref, unref, watch } from 'vue';

type StringInput = { modelValue: string; isValid?: boolean };
type NumberInput = { modelValue: number; isValid?: boolean };
type Props = {
  defaultInput: StringInput;
  requiredInput: StringInput;
  minlengthInput: StringInput;
  maxInput: NumberInput;
  typeInput: StringInput;
  patternInput: StringInput;
};
const props = defineProps<{
  formData: Props;
}>();

const formState = ref<Props | undefined>();

const emit = defineEmits<{
  submit: [data: object];
}>();

const formElement = ref<HTMLFormElement | null>(null);

const customErrorExample = ref('');

const isValid = computed(() => {
  return (
    formState.value &&
    formState.value.defaultInput.isValid &&
    formState.value.requiredInput.isValid &&
    formState.value.minlengthInput.isValid &&
    formState.value.maxInput.isValid &&
    formState.value.typeInput.isValid &&
    formState.value.patternInput.isValid
  );
});

const onSubmit = (event: Event) => {
  event.preventDefault();
  emit('submit', props);
  console.log('# submitting, form is ', isValid.value, unref(props.formData));
};

const onPatternValidityChange = (state: ValidityState) => {
  if (!formState.value) return;
  formState.value.patternInput.isValid = state.valid;
  customErrorExample.value = state.patternMismatch ? 'Allows only lowercase characters or space' : '';
};

const onValidityChange = (inputData: NumberInput | StringInput, state: ValidityState) => {
  inputData.isValid = state.valid;
  console.log('# validity changed', inputData);
};

watch(
  props,
  () => {
    formState.value = { ...props.formData };
  },
  { immediate: true }
);
</script>

<template>
  <form v-if="formState" ref="formElement" class="demo" @submit="onSubmit($event)">
    <h3>This form is {{ isValid ? '' : 'in' }}valid.</h3>

    <TestInput
      v-model="formState.defaultInput.modelValue"
      label="Default"
      @validity-change="onValidityChange(formState.defaultInput, $event)"
    />

    <TestInput
      v-model="formState.requiredInput.modelValue"
      label="Requires a value"
      required
      @validity-change="onValidityChange(formState.requiredInput, $event)"
    />

    <em> Info: minlength only triggers when the user has typed something, it ignores the initial value. </em>
    <TestInput
      v-model="formState.minlengthInput.modelValue"
      label="Minlength 5"
      type="text"
      required
      :min-length="5"
      @validity-change="formState.minlengthInput.isValid = $event.valid"
    />

    <TestInput
      v-model="formState.maxInput.modelValue"
      label="Max 9000"
      type="number"
      :max="9000"
      @validity-change="formState.maxInput.isValid = $event.valid"
    />

    <TestInput
      v-model="formState.typeInput.modelValue"
      label="Type mail"
      type="email"
      @validity-change="formState.typeInput.isValid = $event.valid"
    />

    <TestInput
      v-model="formState.patternInput.modelValue"
      label="Pattern lowercase characters"
      pattern="[a-z ]*"
      :error-message="customErrorExample"
      @validity-change="onPatternValidityChange"
    />

    <div>
      <input type="reset" value="Reset" />
      <button>Submit</button>
      <button :disabled="!isValid">Submits on valid</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.demo {
  display: flex;
  flex-direction: column;

  &:invalid {
    background-color: pink;
  }
}
</style>
