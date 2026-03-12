<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import OnyxFormElementAction from "./OnyxFormElementAction.vue";

const emit = defineEmits<{
  actionClick: [];
}>();
</script>

<template>
  <OnyxFormElementV2 label="Test label">
    <template #default="inputProps">
      <input v-bind="inputProps" />
    </template>

    <template #trailingIcons>
      <OnyxFormElementAction
        label="Test action"
        :icon="iconPlaceholder"
        size="small"
        show-on-focus
        @click="emit('actionClick')"
      />
    </template>
  </OnyxFormElementV2>
</template>
