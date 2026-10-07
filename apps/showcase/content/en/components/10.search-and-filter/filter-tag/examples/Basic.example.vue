<script lang="ts" setup>
import { iconChocolate } from "@sit-onyx/icons";
import { OnyxFilterTag } from "sit-onyx";
import { ref } from "vue";

const active = ref(false);
</script>

<template>
  <OnyxFilterTag v-model:active="active" label="Chocolate & Sweets" :icon="iconChocolate" />
</template>
