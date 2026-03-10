<script setup lang="ts">
import { ref } from "vue";
import OnyxDatePicker from "../OnyxDatePicker.vue";

const modelValue = ref();
</script>

<template>
  <OnyxDatePicker :model-value="modelValue" />
</template>

<style lang="scss" scoped></style>
