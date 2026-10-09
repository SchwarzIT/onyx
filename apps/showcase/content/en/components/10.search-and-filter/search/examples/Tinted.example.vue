<script lang="ts" setup>
import { OnyxUnstableSearch } from "sit-onyx";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <OnyxUnstableSearch v-model="value" placeholder="Search..." color="tinted" />
</template>
