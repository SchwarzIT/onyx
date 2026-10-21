<script lang="ts" setup>
import { iconTrash } from "@sit-onyx/icons";
import { OnyxFileCard, OnyxIconButton } from "sit-onyx";
</script>

<template>
  <OnyxFileCard
    filename="filename.pdf"
    size="42MiB"
    type="application/pdf"
    :status="{ text: 'Uploading...', color: 'primary', progress: 50 }"
  >
    <template #actions>
      <OnyxIconButton color="danger" :icon="iconTrash" label="Remove file" />
    </template>
  </OnyxFileCard>
</template>

<style lang="scss" scoped>
.onyx-file-card {
  width: 100%;
}
</style>
