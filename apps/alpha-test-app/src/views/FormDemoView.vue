<script lang="ts" setup>
import { OnyxAppLayout, OnyxHeadline, OnyxPageLayout } from "sit-onyx";
import { useI18n } from "vue-i18n";
import LanguageSelection from "../components/LanguageSelection.vue";
import FormDemo from "../components/form-demo/FormDemo.vue";

const { t, locale } = useI18n();

const validFormData = {
  defaultInput: "No Validation",
  requiredInput: "Is filled",
  minlengthInput: "Is long enough",
  maxInput: 42,
  typeInput: "john.doe@mail.schwarz",
  patternInput: "only lowercase or space",
};
const invalidFormData = {
  defaultInput: "No Validation",
  requiredInput: "",
  minlengthInput: "",
  maxInput: 9001,
  typeInput: "NotAmail",
  patternInput: "NO UPPERCASE ALLOWED",
};
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
        <FormDemo :form-data="invalidFormData" />

        <hr />

        <OnyxHeadline is="h1" element="h1">Initially Valid example</OnyxHeadline>
        <FormDemo :form-data="validFormData" />
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
