<script lang="ts" setup>
import { OnyxSwitch } from "sit-onyx";
</script>

<template>
  <OnyxSwitch
    :label="{ label: 'Switch', position: 'top' }"
    :value-label="{ truthy: 'ON', falsy: 'OFF' }"
    placeholder="0"
  />
</template>
