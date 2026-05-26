<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxIcon, OnyxTextarea } from "sit-onyx";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <OnyxTextarea v-model="value" label="Example label">
    <template #leadingIcons>
      <OnyxIcon :icon="iconPlaceholder" />
    </template>
  </OnyxTextarea>
</template>
