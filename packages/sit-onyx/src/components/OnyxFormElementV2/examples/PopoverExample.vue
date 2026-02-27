<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxIcon, OnyxUnstableFormElementV2 } from "../../../index.js";
</script>

<template>
  <OnyxUnstableFormElementV2
    :label="{ label: 'Example form element', tooltipText: 'Tooltip text' }"
    :message="{
      label: 'Click on the input to trigger the popover',
      tooltipText: 'Message tooltip',
    }"
    required
  >
    <template #default="props">
      <input v-bind="props" />
    </template>

    <template #popover> Example popover content </template>

    <template #leadingIcons>
      <OnyxIcon :icon="iconPlaceholder" />
    </template>

    <template #trailingIcons>
      <OnyxIcon :icon="iconPlaceholder" />
      <OnyxIcon :icon="iconPlaceholder" />
    </template>

    <template #bottomRight>
      <span>42/64</span>
    </template>
  </OnyxUnstableFormElementV2>
</template>

<style lang="scss" scoped>
.onyx-form-element-v2 {
  max-width: 32rem; // only for this example
}
</style>
