<script lang="ts" setup>
import { OnyxAppLayout, OnyxHeadline, OnyxPageLayout } from "sit-onyx";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSelection from "../components/LanguageSelection.vue";
import FormDemo, { type FormData } from "../components/form-demo/FormDemo.vue";

const { t, locale } = useI18n();

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
  requiredInput: "",
  minlengthInput: "",
  typeInput: "NotAmail",
  patternInput: "NO UPPERCASE ALLOWED",
  switch: false,
});
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebar>
        <div class="sidebar">
          <LanguageSelection v-model="locale" />

          <p>"{{ t("message") }}" in {{ locale }}</p>
        </div>
      </template>

      <div class="page">
        <OnyxHeadline is="h1" element="h1">Initially Invalid example</OnyxHeadline>
        {{ invalidFormData }}
        <FormDemo v-model="invalidFormData" />

        <hr />

        <OnyxHeadline is="h1" element="h1">Initially Valid example</OnyxHeadline>
        {{ validFormData }}
        <FormDemo v-model="validFormData" />
      </div>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--onyx-spacing-xl);
}
.sidebar {
  padding: var(--onyx-spacing-3xs);
}
</style>
