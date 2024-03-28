<script lang="ts" setup>
import { OnyxButton, OnyxHeadline, OnyxInput, TestInput } from "sit-onyx";
import { ref, watchEffect } from "vue";

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
watchEffect(() => (formState.value = { ...props.formData }));

const customErrorExample = ref("");

const onPatternValidityChange = (state: ValidityState) => {
  customErrorExample.value = state.patternMismatch
    ? "Allows only lowercase characters or space"
    : "";
};

const handleSubmit = () => alert("Submit successful!");
const handleReset = () => (formState.value = { ...props.formData });
</script>

<template>
  <form v-if="formState" class="demo" @submit.prevent="handleSubmit">
    <OnyxHeadline is="h2" class="demo__headline"
      >This form is currently <span class="demo__invalid">in</span>valid.</OnyxHeadline
    >

    <OnyxInput v-model="formState.defaultInput" label="Default" />

    <OnyxInput v-model="formState.requiredInput" label="Requires a value" required />

    <OnyxInput
      v-model="formState.minlengthInput"
      label="Minlength 5"
      type="text"
      :minlength="5"
      required
    />

    <TestInput v-model="formState.maxInput" label="Max 9000" type="number" :max="9000" />

    <OnyxInput v-model="formState.typeInput" label="Type mail" type="email" />

    <OnyxInput
      v-model="formState.patternInput"
      label="Pattern lowercase characters"
      pattern="[a-z ]*"
      :custom-error="customErrorExample"
      @validity-change="onPatternValidityChange"
    />

    <div class="demo__actions">
      <OnyxButton label="Reset" variation="secondary" type="reset" @click="handleReset" />
      <OnyxButton class="demo__submit" label="Submit" type="submit" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.demo {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-spacing-md);

  &:valid {
    .demo__invalid {
      display: none;
    }
  }

  &__actions {
    display: flex;
    gap: var(--onyx-spacing-xs);
  }

  :deep(.onyx-input) {
    max-width: 20rem;
  }
}
</style>
