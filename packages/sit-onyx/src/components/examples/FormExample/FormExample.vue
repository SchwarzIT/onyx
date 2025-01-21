<script lang="ts" setup>
import type { OnyxFormProps } from "src/components/OnyxForm/types";
import { ref } from "vue";
import {
  OnyxButton,
  OnyxCheckboxGroup,
  OnyxForm,
  OnyxInput,
  OnyxSelect,
  OnyxStepper,
  OnyxTextarea,
  useToast,
  type CheckboxGroupOption,
} from "../../..";

type LegalTerm = "general-terms" | "optional-terms";

type FormState = {
  username: string;
  email: string;
  favoriteFruits?: string[];
  age?: number;
  description?: string;
  terms?: LegalTerm[];
};

const props = defineProps<OnyxFormProps>();
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

const fruitOptions = ref(
  [
    "Apple",
    "Banana",
    "Mango",
    "Kiwi",
    "Orange",
    "Papaya",
    "Apricot",
    "Lemon",
    "Cranberry",
    "Avocado",
    "Cherry",
    "Coconut",
    "Lychee",
    "Melon",
    "Raspberry",
    "Strawberry",
  ].map((option) => ({ value: option.toLowerCase(), label: option })),
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
    <OnyxForm
      class="onyx-grid"
      :density="props.density"
      :disabled="props.disabled"
      @submit.prevent="handleSubmit"
      @reset="state = {}"
    >
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
        v-model="state.favoriteFruits"
        class="onyx-grid-span-4"
        label="Favorite fruits"
        list-label="List of fruits"
        multiple
        with-search
        required
        :options="fruitOptions"
      />

      <OnyxStepper v-model="state.age" class="onyx-grid-span-4" label="Age" :min="0" :max="100" />

      <OnyxTextarea
        v-model="state.description"
        class="onyx-grid-span-16"
        label="Description"
        :maxlength="512"
        with-counter
      />

      <OnyxCheckboxGroup
        v-model="state.terms"
        class="onyx-grid-span-16"
        label="Legal terms"
        :options="legalTerms"
      />

      <div class="onyx-grid-span-16 actions">
        <OnyxButton label="Reset" type="reset" color="neutral" />
        <OnyxButton label="Submit" type="submit" />
      </div>
    </OnyxForm>

    <pre>Form state: {{ state }}</pre>
  </div>
</template>

<style lang="scss" scoped>
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
