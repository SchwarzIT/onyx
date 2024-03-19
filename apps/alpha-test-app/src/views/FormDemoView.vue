<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import FormDemo from "../components/form-demo/FormDemo.vue";
import { OnyxAppLayout, OnyxButton, OnyxHeadline } from "sit-onyx";

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
    <div class="page">
      <div>
        <p>{{ t("message") }} in {{ locale }}</p>
        <OnyxButton label="Deutsch" mode="plain" @click="locale = 'de-DE'" />
        <OnyxButton label="English" mode="plain" @click="locale = 'en-US'" />
      </div>

      <div data-testid="home-view" class="page">
        <OnyxHeadline is="h1" element="h1">Initially Invalid example</OnyxHeadline>
        <FormDemo :form-data="invalidFormData" />

        <br />
        <hr />

        <OnyxHeadline is="h1" element="h1">Initially Valid example</OnyxHeadline>
        <FormDemo :form-data="validFormData" />
      </div>
    </div>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.page {
  max-width: 1280px;
  padding: 2rem;
}
</style>
