<script lang="ts" setup>
import { OnyxHeadline, OnyxPageLayout } from "sit-onyx";
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
</script>

<template>
  <OnyxPageLayout class="onyx-grid-container">
    <section class="header">
      <OnyxHeadline is="h1" element="h1">Form Demos</OnyxHeadline>

      <LanguageSelection v-model="locale" />
    </section>

    <OnyxHeadline is="h2" element="h1">Initially Invalid example</OnyxHeadline>
    <FormDemo v-model="invalidFormData" />
    <pre class="state">State: {{ invalidFormData }}</pre>

    <hr />

    <OnyxHeadline is="h2" element="h1">Initially Valid example</OnyxHeadline>
    <FormDemo v-model="validFormData" />
    <pre class="state">State: {{ validFormData }}</pre>
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
