<script lang="ts" setup>
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxForm from "../OnyxForm/OnyxForm.vue";
import OnyxFileUpload from "./OnyxFileUpload.vue";

const emit = defineEmits<{
  formSubmit: [];
}>();
</script>

<template>
  <OnyxForm @submit.prevent="emit('formSubmit')">
    <OnyxFileUpload required show-error />,
    <OnyxButton label="Submit" type="submit" />
  </OnyxForm>
</template>
