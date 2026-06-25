<script lang="ts" setup>
import { OnyxPagination } from "sit-onyx";
import { ref } from "vue";

const page = ref(1);
</script>

<template>
  <OnyxPagination v-model="page" :pages="42" type="compact" />
</template>
