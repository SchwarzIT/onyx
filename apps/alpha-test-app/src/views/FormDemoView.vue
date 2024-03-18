<script lang="ts" setup>
import { useI18n } from "vue-i18n";
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
  <div class="page">
    <div>
      <p>{{ t("message") }} in {{ locale }}</p>
      <button @click="locale = 'de-DE'">Deutsch</button>
      <button @click="locale = 'en-US'">English</button>
    </div>

    <div data-testid="home-view" class="page">
      <h1 element="h1">Initially Invalid example</h1>
      <FormDemo :form-data="invalidFormData" />

      <br />
      <hr />

      <h1 element="h1">Initially Valid example</h1>
      <FormDemo :form-data="validFormData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  max-width: 1280px;
  padding: 2rem;
}
</style>
