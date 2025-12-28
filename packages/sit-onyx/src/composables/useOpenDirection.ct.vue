<script lang="ts" setup>
import { onMounted, useTemplateRef } from "vue";
import { useOpenDirection } from "./useOpenDirection.js";

const element = useTemplateRef("elementRef");
const { openDirection, updateOpenDirection } = useOpenDirection(element);

onMounted(() => {
  updateOpenDirection();
});
</script>

<template>
  <div ref="elementRef" class="onyx-component">
    {{ openDirection }}
    <button type="button" aria-label="Update direction" @click="updateOpenDirection">Update</button>
  </div>
</template>
