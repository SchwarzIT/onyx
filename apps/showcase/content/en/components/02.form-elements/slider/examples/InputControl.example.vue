<script lang="ts" setup>
import { OnyxSlider } from "sit-onyx";
import { ref } from "vue";

const range = ref<[number, number]>([25, 75]);
</script>

<template>
  <OnyxSlider v-model="range" label="Example label" mode="range" control="input" />
</template>
