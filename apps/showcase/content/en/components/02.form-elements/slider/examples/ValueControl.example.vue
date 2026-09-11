<script lang="ts" setup>
import { OnyxSlider } from "sit-onyx";
import { ref } from "vue";

const value = ref(50);
</script>

<template>
  <OnyxSlider v-model="value" label="Example label" control="value" />
</template>
