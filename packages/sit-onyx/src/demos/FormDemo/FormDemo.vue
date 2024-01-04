<script lang="ts" setup>
import { TestInput } from "@/index";
import { computed, ref } from "vue";

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

const formElement = ref<HTMLFormElement | null>(null);

const { formData } = props;

const customErrorExample = ref("");

const isValid = computed<boolean>(() => {
  return formElement.value?.checkValidity() || false;
});

const onSubmit = (event: Event) => {
  event.preventDefault();
  emit("submit", formData);
};

const onValidityChange = (state: ValidityState) => {
  customErrorExample.value = state.patternMismatch
    ? "Allows only lowercase characters or space"
    : "";
};
</script>

<template>
  <form ref="formElement" class="demo" @submit="onSubmit($event)">
    <h3>This form is {{ isValid ? "" : "in" }}valid.</h3>

    <TestInput v-model="formData.defaultInput" label="Default" />

    <TestInput v-model="formData.requiredInput" label="Requires a value" required />

    <em>
      Info: minlength only triggers when the user has typed something, it ignores the initial value.
    </em>
    <TestInput
      v-model="formData.minlengthInput"
      label="Minlength 5"
      type="text"
      required
      :min-length="5"
    />

    <!-- formData.maxInput must currently be type string because TestInput requires string values, even though input is type number... -->
    <TestInput v-model="formData.maxInput" label="Max 9000" type="number" max="9000" />

    <TestInput v-model="formData.typeInput" label="Type mail" type="email" />

    <TestInput
      v-model="formData.patternInput"
      label="Pattern lowercase characters"
      pattern="[a-z ]*"
      :custom-error-message="customErrorExample"
      @validity-change="onValidityChange"
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
