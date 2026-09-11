<script lang="ts" setup>
import { OnyxSelect, SelectOption } from "sit-onyx";

const options = [] satisfies SelectOption[];
</script>

<template>
  <OnyxSelect label="Loading" list-label="Available options" :options loading />
  <OnyxSelect label="Skeleton" list-label="Available options" :options skeleton />
</template>
