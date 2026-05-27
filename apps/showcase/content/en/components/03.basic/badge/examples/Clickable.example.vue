<script lang="ts" setup>
import { iconPlusSmall, iconXSmall } from "@sit-onyx/icons";
import { OnyxBadge } from "sit-onyx";
</script>

<template>
  <OnyxBadge :clickable="{ label: 'Click to add the badge', actionIcon: iconPlusSmall }">
    Clickable
  </OnyxBadge>

  <OnyxBadge
    :clickable="{ label: 'Click to remove the badge', actionIcon: iconXSmall, active: true }"
  >
    Clickable
  </OnyxBadge>
</template>
