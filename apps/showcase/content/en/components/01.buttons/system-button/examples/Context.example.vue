<script lang="ts" setup>
import { iconCheckSmall, iconFileCopy } from "@sit-onyx/icons";
import { useClipboard } from "@vueuse/core";
import { OnyxIcon, OnyxLink, OnyxSystemButton } from "sit-onyx";

const email = "jane.doe@example.com";
const clipboard = useClipboard({ source: email });
</script>

<template>
  <div class="example">
    <OnyxLink :href="`mailto:${email}`">{{ email }}</OnyxLink>

    <OnyxIcon v-if="clipboard.copied.value" :icon="iconCheckSmall" color="success" />
    <OnyxSystemButton v-else label="Copy email" :icon="iconFileCopy" @click="clipboard.copy()" />
  </div>
</template>

<style lang="scss" scoped>
.example {
  display: flex;
  align-items: center;
  gap: var(--onyx-density-xs);
}
</style>
