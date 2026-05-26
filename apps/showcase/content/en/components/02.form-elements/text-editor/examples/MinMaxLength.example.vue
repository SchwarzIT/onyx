<script lang="ts" setup>
import { OnyxTextEditor } from "@sit-onyx/tiptap";
import { ref } from "vue";

const value = ref<string>();
</script>

<template>
  <OnyxTextEditor
    v-model="value"
    label="Example label"
    :minlength="8"
    :maxlength="32"
    with-counter
  />
</template>
