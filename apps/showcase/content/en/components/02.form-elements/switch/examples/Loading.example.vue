<script lang="ts" setup>
import { OnyxSwitch } from "sit-onyx";
</script>

<template>
  <OnyxSwitch :label="{ label: 'Example label', position: 'top' }" loading />
  <OnyxSwitch :label="{ label: 'Example label', position: 'top' }" skeleton />
</template>
