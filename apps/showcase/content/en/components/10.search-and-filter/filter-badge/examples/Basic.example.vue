<script lang="ts" setup>
import { OnyxFilterBadge } from "sit-onyx";
import { ref } from "vue";

const active = ref(false);
</script>

<template>
  <OnyxFilterBadge v-model:active="active" label="Shirts & Pullovers" />
  <OnyxFilterBadge v-model:active="active" label="Shirts & Pullovers" color="neutral" />
  <OnyxFilterBadge v-model:active="active" label="Shirts & Pullovers" color="danger" />
  <OnyxFilterBadge v-model:active="active" label="Shirts & Pullovers" color="warning" />
  <OnyxFilterBadge v-model:active="active" label="Shirts & Pullovers" color="success" />
  <OnyxFilterBadge v-model:active="active" label="Shirts & Pullovers" color="info" />
</template>
