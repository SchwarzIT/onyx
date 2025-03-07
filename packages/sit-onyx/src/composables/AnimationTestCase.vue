<script setup lang="ts">
import { onMounted, ref } from "vue";
import OnyxSkeleton from "../components/OnyxSkeleton/OnyxSkeleton.vue";

const shown = ref(false);

// we actively delay the second skeleton after the first one is mounted to ensure that they have different animation start times
onMounted(() => setTimeout(() => (shown.value = true), 50));
</script>

<template>
  <OnyxSkeleton data-testid="permanent" />
  <OnyxSkeleton v-if="shown" data-testid="delayed" />
</template>

<style>
.onyx-skeleton {
  height: 1rem;
  width: 4rem;
}
</style>
