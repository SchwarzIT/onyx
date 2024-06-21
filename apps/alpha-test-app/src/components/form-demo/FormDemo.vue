<script lang="ts" setup>
import {
  OnyxButton,
  OnyxCheckboxGroup,
  OnyxHeadline,
  OnyxInput,
  OnyxRadioGroup,
  OnyxSwitch,
  OnyxTextarea,
  type CheckboxGroupOption,
  type OnyxRadioGroupProps,
  type RadioButtonOption,
} from "sit-onyx";
import { ref } from "vue";

export type FormData = Partial<{
  defaultInput: string;
  requiredInput: string;
  minlengthInput: string;
  requiredTextarea: string;
  minlengthTextarea: string;
  typeInput: string;
  patternInput: string;
  switch: boolean;
  checkboxGroup: number[];
  radioGroup: OnyxRadioGroupProps["modelValue"];
}>;

const formState = defineModel<FormData>();

const customErrorExample = ref("");

const onPatternValidityChange = (state: ValidityState) => {
  customErrorExample.value = state.patternMismatch
    ? "Allows only lowercase characters or space"
    : "";
};

const handleSubmit = () => alert("Submit successful!");

const checkboxOptions: CheckboxGroupOption[] = [
  { value: 1, label: "Option 1" },
  { value: 2, label: "Required option", required: true },
];

const radioOptions: RadioButtonOption[] = [
  { value: 1, label: "Option 1" },
  { value: 2, label: "Option 2" },
];
</script>

<template>
  <form v-if="formState" class="demo" @submit.prevent="handleSubmit" @reset="formState = {}">
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

    <OnyxTextarea v-model="formState.requiredTextarea" label="Requires a value" required />

    <OnyxTextarea
      v-model="formState.minlengthTextarea"
      label="Minlength 5"
      type="text"
      :minlength="5"
      required
    />

    <OnyxInput v-model="formState.typeInput" label="Type email" type="email" />

    <OnyxInput
      v-model="formState.patternInput"
      label="Pattern lowercase characters"
      pattern="[a-z ]*"
      :custom-error="customErrorExample"
      @validity-change="onPatternValidityChange"
    />

    <OnyxSwitch v-model="formState.switch" label="Switch" required />

    <OnyxCheckboxGroup v-model="formState.checkboxGroup" :options="checkboxOptions" />

    <OnyxRadioGroup v-model="formState.radioGroup" :options="radioOptions" required />

    <div class="demo__actions">
      <OnyxButton label="Reset" color="neutral" type="reset" />
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

  .onyx-input,
  .onyx-textarea {
    max-width: 20rem;
  }
}
</style>
