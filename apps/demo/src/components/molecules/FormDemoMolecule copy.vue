<script lang="ts" setup>
import { TestInput } from 'sit-onyx';
import { computed, ref, toRefs } from 'vue';

const props = defineProps<{
  defaultInput: { value: string; isValid?: boolean };
  requiredInput: { value: string; isValid?: boolean };
  minlengthInput: { value: string; isValid?: boolean };
  maxInput: { value: number; isValid?: boolean };
  typeInput: { value: string; isValid?: boolean };
  patternInput: { value: string; isValid?: boolean };
}>();

const emit = defineEmits<{
  submit: [data: object];
}>();

const { defaultInput, requiredInput, minlengthInput, maxInput, typeInput, patternInput } = toRefs(props);

const formElement = ref<HTMLFormElement | null>(null);

const customErrorExample = ref('');

const isValid = computed(() => {
  return (
    defaultInput.value.isValid &&
    requiredInput.value.isValid &&
    minlengthInput.value.isValid &&
    maxInput.value.isValid &&
    typeInput.value.isValid &&
    patternInput.value.isValid
  );
});

const onSubmit = (event: Event) => {
  event.preventDefault();
  emit('submit', props);
  console.log('# submitting', event);
};

const onPatternValidityChange = (state: ValidityState) => {
  patternInput.value.isValid = state.valid;
  customErrorExample.value = state.patternMismatch ? 'Allows only lowercase characters or space' : '';
};
</script>

<template>
  <form ref="formElement" class="demo" @submit="onSubmit($event)">
    <h3>This form is {{ isValid ? '' : 'in' }}valid.</h3>

    <TestInput v-model="defaultInput.value" label="Default" @validity-change="defaultInput.isValid = $event.valid" />

    <TestInput
      v-model="requiredInput.value"
      label="Requires a value"
      required
      @validity-change="requiredInput.isValid = $event.valid"
    />

    <em> Info: minlength only triggers when the user has typed something, it ignores the initial value. </em>
    <TestInput
      v-model="minlengthInput.value"
      label="Minlength 5"
      type="text"
      required
      :min-length="5"
      @validity-change="minlengthInput.isValid = $event.valid"
    />

    <TestInput
      v-model="maxInput.value"
      label="Max 9000"
      type="number"
      :max="9000"
      @validity-change="maxInput.isValid = $event.valid"
    />

    <TestInput
      v-model="typeInput.value"
      label="Type mail"
      type="email"
      @validity-change="patternInput.isValid = $event.valid"
    />

    <TestInput
      v-model="patternInput.value"
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
}
</style>
