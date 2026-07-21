<script setup lang="ts">
import type { ComarkProps } from "@comark/vue/components/Comark";
import { OnyxComark } from "../index.js";

const props = defineProps<ComarkProps>();
</script>

<template>
  <Suspense>
    <OnyxComark v-bind="props" />
  </Suspense>
</template>

<style>
.onyx-comark-renderer {
  width: "max-content";
  padding: "1rem";
}
</style>
