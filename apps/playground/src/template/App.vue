<script lang="ts" setup>
import { OnyxInput } from "sit-onyx";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <p>You can edit the code on the left and see the live results here.</p>
  <OnyxInput v-model="value" label="Example input" />
</template>

<style>
@import "sit-onyx/global.css";
</style>
