<script lang="ts" setup>
import { OnyxSearch } from "sit-onyx";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <OnyxSearch v-model="value" placeholder="Search..." color="tinted" />
</template>
