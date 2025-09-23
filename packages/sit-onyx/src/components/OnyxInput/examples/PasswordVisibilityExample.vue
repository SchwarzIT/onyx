<script lang="ts" setup>
import { ref } from "vue";
import { OnyxButton, OnyxInput } from "../../../index.js";

const modelValue = ref("Example password");
const showPassword = ref(true);
</script>

<template>
  <div class="example-password-visibility">
    <OnyxInput
      v-model="modelValue"
      v-model:show-password="showPassword"
      label="Password"
      type="password"
    />
    <OnyxButton :label="showPassword ? 'Hide' : 'Show'" @click="showPassword = !showPassword" />
  </div>
</template>

<style lang="scss" scoped>
.example-password-visibility {
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-lg);
}
</style>
