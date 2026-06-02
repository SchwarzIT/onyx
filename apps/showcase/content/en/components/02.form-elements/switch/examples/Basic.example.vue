<script lang="ts" setup>
import { OnyxSwitch } from "sit-onyx";
import { ref } from "vue";

const checked = ref(false);
</script>

<template>
  <OnyxSwitch v-model="checked" label="Example label" required />
</template>
