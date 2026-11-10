<script lang="ts" setup>
import { iconToolBold } from "@sit-onyx/icons";
import { OnyxEditorToolbarAction } from "@sit-onyx/tiptap";
import { ref } from "vue";

const active = ref(false);
</script>

<template>
  <OnyxEditorToolbarAction label="Bold" :icon="iconToolBold" :active @click="active = !active" />
</template>
