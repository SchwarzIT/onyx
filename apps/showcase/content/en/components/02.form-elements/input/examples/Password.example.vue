<script lang="ts" setup>
import { OnyxInput } from "sit-onyx";
import { ref } from "vue";

const value = ref("very-secret-password");
const showPassword = ref(false);
</script>

<template>
  <!--
    The "v-model:show-password" is optional.
    If you don't need to manually control the password visibility, you can remove it so its managed internally.
  -->
  <OnyxInput
    v-model="value"
    v-model:show-password="showPassword"
    label="Password"
    type="password"
  />
</template>
