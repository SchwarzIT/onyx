<script lang="ts" setup>
import {
  OnyxAppLayout,
  OnyxPageLayout,
  OnyxBottomBar,
  OnyxButton,
  OnyxForm,
  OnyxInput,
  useToast,
} from "sit-onyx";
import { ref, useId } from "vue";

const toast = useToast();
const formId = useId();

const data = ref({ email: "", password: "" });

const handleSubmit = () => {
  toast.show({
    headline: "Form submitted",
    description: "This is only an example.",
    color: "success",
  });
};
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <OnyxForm :id="formId" class="onyx-grid" @submit.prevent="handleSubmit">
        <OnyxInput
          v-model="data.email"
          class="onyx-grid-span-4"
          label="Email"
          type="email"
          required
        />

        <OnyxInput
          v-model="data.password"
          class="onyx-grid-span-4s"
          label="Password"
          type="password"
          :minlength="3"
          required
        />
      </OnyxForm>

      <template #footer>
        <OnyxBottomBar>
          <OnyxButton label="Save" type="submit" :form="formId" />
        </OnyxBottomBar>
      </template>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>
