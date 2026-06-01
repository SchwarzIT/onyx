<script lang="ts" setup>
import { iconXSmall } from "@sit-onyx/icons";
import { OnyxTag } from "sit-onyx";
</script>

<template>
  <OnyxTag
    label="Example label"
    :clickable="{ label: 'Click to remove the tag', actionIcon: iconXSmall }"
  />
</template>
