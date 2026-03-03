<script lang="ts" setup>
import { onMounted, useTemplateRef } from "vue";
import { useOpenDirection } from "./useOpenDirection.js";

const element = useTemplateRef("element");
const { openDirection, updateOpenDirection } = useOpenDirection(element);

onMounted(() => {
  updateOpenDirection();
});
</script>

<template>
  <div ref="element" class="onyx-component">
    {{ openDirection }}
    <button type="button" aria-label="Update direction" @click="updateOpenDirection">Update</button>
  </div>
</template>
