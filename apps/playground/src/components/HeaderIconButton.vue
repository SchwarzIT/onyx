<script lang="ts" setup>
import { OnyxTooltip, OnyxUnstableNavButton } from "sit-onyx";

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
    <template #default="{ trigger }">
      <!-- empty title is needed to prevent default title of the icon button
    which is not needed because of the tooltip -->
      <OnyxUnstableNavButton
        v-bind="trigger"
        title=""
        :label="props.label"
        :icon="props.icon"
        hide-label
        @click="emit('click')"
      />
    </template>
  </OnyxTooltip>
</template>
