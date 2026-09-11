<script lang="ts" setup>
import { OnyxTextEditor } from "@sit-onyx/tiptap";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <OnyxTextEditor v-model="value" label="Top" />
  <OnyxTextEditor v-model="value" :label="{ label: 'Left', position: 'left' }" />
  <OnyxTextEditor v-model="value" :label="{ label: 'Right', position: 'right' }" />
  <OnyxTextEditor v-model="value" :label="{ label: 'Hidden', hidden: true }" />
</template>
