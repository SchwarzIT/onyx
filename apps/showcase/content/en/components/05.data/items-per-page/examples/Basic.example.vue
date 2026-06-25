<script lang="ts" setup>
import { OnyxItemsPerPage } from "sit-onyx";
import { ref } from "vue";

const options = [25, 50, 100];
const itemsPerPage = ref(options[0]);
</script>

<template>
  <OnyxItemsPerPage v-model="itemsPerPage" :options />
  <OnyxItemsPerPage v-model="itemsPerPage" :options :label="{ position: 'left' }" />
</template>
