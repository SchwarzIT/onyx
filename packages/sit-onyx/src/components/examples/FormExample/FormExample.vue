<script lang="ts" setup>
import { ref } from "vue";
import {
  OnyxButton,
  OnyxCheckboxGroup,
  OnyxInput,
  OnyxSelect,
  OnyxStepper,
  OnyxTextarea,
  useToast,
  type CheckboxGroupOption,
  type SelectOption,
} from "../../..";

type LegalTerm = "general-terms" | "optional-terms";

type FormState = {
  username: string;
  email: string;
  select?: string[];
  stepper?: number;
  textarea?: string;
  terms?: LegalTerm[];
};

const toast = useToast();
const state = ref<Partial<FormState>>({});

const handleSubmit = () => {
  // this function is only called if all form validations are correct so
  // the type cast to `FormState` is considered safe
  const formData = { ...state.value } as FormState;

  toast.show({
    headline: "Form submitted",
    description: JSON.stringify(formData),
    color: "success",
  });
};

const selectOptions = ref<SelectOption[]>(
  // generate some dummy options
  Array.from({ length: 5 }, (_, index) => {
    const id = index + 1;
    return {
      label: `Option ${id}`,
      value: id,
    };
  }),
);

const legalTerms: CheckboxGroupOption<LegalTerm>[] = [
  {
    label: "I agree to the terms and conditions",
    value: "general-terms",
    required: true,
  },
  {
    label: "Some optional terms",
    value: "optional-terms",
  },
];
</script>

<template>
  <div>
    <form class="onyx-grid form" @submit.prevent="handleSubmit" @reset="state = {}">
      <OnyxInput
        v-model="state.username"
        class="onyx-grid-span-4"
        label="Username"
        autocomplete="username"
        :minlength="3"
        :maxlength="16"
        with-counter
        required
      />
      <OnyxInput
        v-model="state.email"
        class="onyx-grid-span-4"
        label="Email"
        type="email"
        autocomplete="email"
        required
      />

      <OnyxSelect
        v-model="state.select"
        class="onyx-grid-span-4"
        label="Select"
        list-label="List of options"
        multiple
        with-search
        required
        :options="selectOptions"
      />

      <OnyxStepper v-model="state.stepper" class="onyx-grid-span-4" label="Stepper" />

      <OnyxTextarea
        v-model="state.textarea"
        class="onyx-grid-span-16"
        label="Textarea"
        :maxlength="512"
        with-counter
      />

      <OnyxCheckboxGroup
        v-model="state.terms"
        class="onyx-grid-span-16"
        headline="Legal terms"
        :options="legalTerms"
      />

      <div class="onyx-grid-span-16 form__actions">
        <OnyxButton label="Reset" type="reset" color="neutral" />
        <OnyxButton label="Submit" type="submit" />
      </div>
    </form>

    <pre>Form state: {{ state }}</pre>
  </div>
</template>

<style lang="scss" scoped>
.form {
  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--onyx-grid-gutter);
  }
}
</style>
