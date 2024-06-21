<script lang="ts" setup>
import {
  OnyxButton,
  OnyxCheckboxGroup,
  OnyxHeadline,
  OnyxInput,
  OnyxRadioButtonGroup,
  OnyxSelect,
  OnyxSwitch,
  OnyxTextarea,
  type CheckboxGroupOption,
  type OnyxRadioButtonGroupProps,
  type RadioButtonOption,
  type SelectOption,
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
  requiredSelect: SelectOption[];
  radioGroup: OnyxRadioButtonGroupProps["modelValue"];
}>;

const formState = defineModel<FormData>();

const selectOptions = [
  {
    value: "apple",
    label: "Apple",
  },
  {
    value: "banana",
    label: "Banana",
  },
  {
    value: "strawberry",
    label: "Strawberry",
  },
];

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
  <form
    v-if="formState"
    class="demo onyx-grid"
    @submit.prevent="handleSubmit"
    @reset="formState = {}"
  >
    <OnyxHeadline is="h2" class="onyx-grid-span-20"
      >This form is currently <span class="demo__invalid">in</span>valid.</OnyxHeadline
    >

    <OnyxInput v-model="formState.defaultInput" class="onyx-grid-span-4" label="Default" />

    <OnyxInput
      v-model="formState.requiredInput"
      class="onyx-grid-span-4"
      label="Requires a value"
      required
    />

    <OnyxInput
      v-model="formState.minlengthInput"
      class="onyx-grid-span-4"
      label="Minlength 5"
      type="text"
      :minlength="5"
      required
    />
    <OnyxInput
      v-model="formState.typeInput"
      class="onyx-grid-span-4"
      label="Type email"
      type="email"
    />

    <OnyxInput
      v-model="formState.patternInput"
      class="onyx-grid-span-4"
      label="Pattern lowercase characters"
      pattern="[a-z ]*"
      :custom-error="customErrorExample"
      @validity-change="onPatternValidityChange"
    />

    <OnyxSelect
      v-model="formState.requiredSelect"
      class="onyx-grid-span-4"
      label="Example select"
      list-label="List label"
      multiple
      :options="selectOptions"
      placeholder="Placeholder..."
      required
    />

    <OnyxTextarea
      v-model="formState.requiredTextarea"
      class="onyx-grid-span-4"
      label="Requires a value"
      required
    />

    <OnyxTextarea
      v-model="formState.minlengthTextarea"
      class="onyx-grid-span-4"
      label="Minlength 5"
      type="text"
      :minlength="5"
      required
    />

    <OnyxSwitch v-model="formState.switch" class="onyx-grid-span-4" label="Switch" required />

    <OnyxCheckboxGroup
      v-model="formState.checkboxGroup"
      class="onyx-grid-span-4"
      :options="checkboxOptions"
    />

    <OnyxRadioButtonGroup
      v-model="formState.radioGroup"
      class="onyx-grid-span-4"
      :options="radioOptions"
      required
    />

    <div class="demo__actions onyx-grid-span-20">
      <OnyxButton label="Reset" color="neutral" type="reset" />
      <OnyxButton class="demo__submit" label="Submit" type="submit" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.demo {
  &:valid {
    .demo__invalid {
      display: none;
    }
  }

  &__actions {
    display: flex;
    gap: var(--onyx-spacing-xs);
  }
}
</style>
