<script lang="ts" setup>
import { OnyxTextEditor } from "@sit-onyx/tiptap";
import { ref } from "vue";

const value = ref<string>();
</script>

<template>
  <OnyxTextEditor v-model="value" label="Example label" placeholder="Placeholder..." required />
</template>
