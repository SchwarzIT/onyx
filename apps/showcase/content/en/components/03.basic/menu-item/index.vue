<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxIcon, OnyxMenuItem, OnyxTag } from "sit-onyx";
</script>

<template>
  <OnyxMenuItem>
    <OnyxIcon :icon="iconPlaceholder" />
    Menu item

    <div class="trailing">
      <OnyxTag label="Tag" />
    </div>
  </OnyxMenuItem>
</template>

<style lang="scss" scoped>
.trailing {
  margin-left: auto;
}
</style>
