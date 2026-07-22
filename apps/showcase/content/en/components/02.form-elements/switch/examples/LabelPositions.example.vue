<script lang="ts" setup>
import { OnyxSwitch } from "sit-onyx";
import { ref } from "vue";

const value = ref(false);
</script>

<template>
  <OnyxSwitch v-model="value" :label="{ label: 'Top', position: 'top' }" />
  <OnyxSwitch v-model="value" :label="{ label: 'Left', position: 'left' }" />
  <OnyxSwitch v-model="value" :label="{ label: 'Right', position: 'right' }" />
  <OnyxSwitch v-model="value" :label="{ label: 'Hidden', hidden: true }" />
</template>
