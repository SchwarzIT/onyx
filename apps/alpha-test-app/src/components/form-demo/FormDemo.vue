<script lang="ts" setup>
import { OnyxButton, TestInput } from "sit-onyx";
import { ref, watch } from "vue";

type FormData = {
  defaultInput: string;
  requiredInput: string;
  minlengthInput: string;
  maxInput: number;
  typeInput: string;
  patternInput: string;
};
const props = defineProps<{
  formData: FormData;
}>();

const formState = ref<FormData>();

const emit = defineEmits<{
  submit: [data: FormData];
}>();

const formElement = ref<HTMLFormElement | null>(null);

const customErrorExample = ref("");

const onPatternValidityChange = (state: ValidityState) => {
  customErrorExample.value = state.patternMismatch
    ? "Allows only lowercase characters or space"
    : "";
};

const submit = () => alert("Submit successful!");

watch(
  props,
  () => {
    formState.value = { ...props.formData };
  },
  { immediate: true },
);
</script>

<template>
  <form
    v-if="formState"
    ref="formElement"
    class="demo"
    @submit.prevent="emit('submit', props.formData)"
  >
    <h3>This form is <span class="demo__invalid">in</span>valid.</h3>

    <TestInput v-model="formState.defaultInput" label="Default" />

    <TestInput v-model="formState.requiredInput" label="Requires a value" required />

    <em>
      Info: minlength only triggers when the user has typed something, it ignores the initial value.
    </em>
    <TestInput
      v-model="formState.minlengthInput"
      label="Minlength 5"
      type="text"
      required
      :min-length="5"
    />

    <TestInput v-model="formState.maxInput" label="Max 9000" type="number" :max="9000" />

    <TestInput v-model="formState.typeInput" label="Type mail" type="email" />

    <TestInput
      v-model="formState.patternInput"
      label="Pattern lowercase characters"
      pattern="[a-z ]*"
      :error-message="customErrorExample"
      @validity-change="onPatternValidityChange"
    />

    <div class="demo__actions">
      <OnyxButton label="Reset" variation="secondary" type="reset" />
      <OnyxButton class="demo__submit" label="Submits on valid" type="submit" @click="submit" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.demo {
  display: flex;
  flex-direction: column;

  &:valid {
    .demo__invalid {
      display: none;
    }
  }
  &:invalid {
    .demo__submit {
      pointer-events: none;
      opacity: 0.4;
    }
  }

  &__actions {
    display: flex;
    gap: var(--onyx-spacing-xs);
  }
}
</style>
