<script lang="ts" setup>
import {
  OnyxCheckbox,
  type OnyxFormProps,
  OnyxHeadline,
  OnyxPageLayout,
  OnyxSelect,
} from "sit-onyx";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSelection from "../components/LanguageSelection.vue";
import FormDemo, { type FormData } from "../components/form-demo/FormDemo.vue";

const { locale } = useI18n();

const validFormData = ref<FormData>({
  defaultInput: "No Validation",
  requiredInput: "Is filled",
  minlengthInput: "Is long enough",
  typeInput: "john.doe@mail.schwarz",
  patternInput: "only lowercase or space",
  switch: true,
  checkboxGroup: [2],
  radioGroup: 1,
});

const invalidFormData = ref<FormData>({
  defaultInput: "No Validation",
  typeInput: "NotAmail",
  patternInput: "NO UPPERCASE ALLOWED",
});

const formSettings = ref<OnyxFormProps>({
  disabled: false,
  skeleton: false,
  showError: "touched",
  requiredMarker: "required",
  density: "default",
});
</script>

<template>
  <OnyxPageLayout>
    <div class="onyx-grid-container">
      <OnyxHeadline is="h1" element="h1">Form Demos</OnyxHeadline>
      <section class="header onyx-grid">
        <OnyxHeadline is="h2" class="onyx-grid-span-full"> Settings</OnyxHeadline>

        <LanguageSelection v-model="locale" class="onyx-grid-span-2" />
        <div class="onyx-grid-span-2">
          <OnyxHeadline is="h5" element="h3">Toggles</OnyxHeadline>
          <OnyxCheckbox v-model="formSettings.disabled" label="Disabled" value="disabled-form" />
          <OnyxCheckbox v-model="formSettings.skeleton" label="Skeleton" value="skeleton-form" />
        </div>
        <OnyxSelect
          v-model="formSettings.showError"
          label="Show Errors"
          value="error-mode-form"
          class="onyx-grid-span-2"
          :options="[
            { label: 'touched', value: 'touched' },
            { label: 'true', value: true },
            { label: 'false', value: false },
          ]"
        />
        <OnyxSelect
          v-model="formSettings.requiredMarker"
          label="Required Marker"
          value="required-mode-form"
          class="onyx-grid-span-2"
          :options="[
            { label: 'required', value: 'required' },
            { label: 'optional', value: 'optional' },
          ]"
        />
        <OnyxSelect
          v-model="formSettings.density"
          label="Density"
          value="required-mode-form"
          class="onyx-grid-span-2"
          :options="[
            { label: 'compact', value: 'compact' },
            { label: 'default', value: 'default' },
            { label: 'cozy', value: 'cozy' },
          ]"
        />
      </section>

      <OnyxHeadline is="h2" element="h1">Initially Invalid example</OnyxHeadline>
      <FormDemo v-bind="formSettings" v-model="invalidFormData" />
      <pre class="state">State: {{ invalidFormData }}</pre>

      <hr />

      <OnyxHeadline is="h2" element="h1">Initially Valid example</OnyxHeadline>
      <FormDemo v-bind="formSettings" v-model="validFormData" />
      <pre class="state">State: {{ validFormData }}</pre>
    </div>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.header {
  margin-bottom: var(--onyx-spacing-lg);
}
.sidebar {
  padding: var(--onyx-spacing-3xs);
}
.state {
  color: var(--onyx-color-text-icons-neutral-soft);
  padding: var(--onyx-spacing-md) 0;
}
</style>
