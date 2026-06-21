<script lang="ts" setup>
import { OnyxFileCard } from "sit-onyx";
</script>

<template>
  <OnyxFileCard
    filename="example.pdf"
    size="42MiB"
    type="application/pdf"
    :status="{ text: 'Primary', color: 'primary', progress: 50 }"
  />
  <OnyxFileCard
    filename="example.pdf"
    size="42MiB"
    type="application/pdf"
    :status="{ text: 'Neutral', color: 'neutral', progress: 50 }"
  />
  <OnyxFileCard
    filename="example.pdf"
    size="42MiB"
    type="application/pdf"
    :status="{ text: 'Danger', color: 'danger', progress: 50 }"
  />
  <OnyxFileCard
    filename="example.pdf"
    size="42MiB"
    type="application/pdf"
    :status="{ text: 'Warning', color: 'warning', progress: 50 }"
  />
  <OnyxFileCard
    filename="example.pdf"
    size="42MiB"
    type="application/pdf"
    :status="{ text: 'Success', color: 'success', progress: 50 }"
  />
  <OnyxFileCard
    filename="example.pdf"
    size="42MiB"
    type="application/pdf"
    :status="{ text: 'Info', color: 'info', progress: 50 }"
  />
</template>
