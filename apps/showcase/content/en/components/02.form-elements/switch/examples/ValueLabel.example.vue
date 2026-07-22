<script lang="ts" setup>
import { OnyxSwitch } from "sit-onyx";
import { ref } from "vue";

const value = ref(false);
</script>

<template>
  <OnyxSwitch
    v-model="value"
    :label="{ label: 'Label', position: 'top' }"
    :value-label="{ truthy: 'ON', falsy: 'OFF' }"
  />
</template>
