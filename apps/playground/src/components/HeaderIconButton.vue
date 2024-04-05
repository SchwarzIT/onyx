<script lang="ts" setup>
import { OnyxIconButton, OnyxTooltip } from "sit-onyx";

const props = defineProps<{
  icon: string;
  label: string;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <OnyxTooltip :text="props.label" position="bottom">
    <!-- empty title is needed to prevent default title of the icon button
    which is not needed because of the tooltip -->
    <OnyxIconButton
      title=""
      :label="props.label"
      :icon="props.icon"
      variation="secondary"
      @click="emit('click')"
    />
  </OnyxTooltip>
</template>
