<script lang="ts" setup>
import { OnyxTextEditor } from "@sit-onyx/tiptap";
import { ref } from "vue";

const value = ref<string>("<p>Example value</p>");
</script>

<template>
  <OnyxTextEditor v-model="value" label="Example label" disabled />
</template>
