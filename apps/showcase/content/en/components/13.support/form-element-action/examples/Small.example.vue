<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxInput, OnyxUnstableFormElementAction } from "sit-onyx";

const handleClick = () => {
  // implement your custom login here...
};
</script>

<template>
  <OnyxInput label="Label" placeholder="Placeholder">
    <template #trailingIcons>
      <OnyxUnstableFormElementAction
        label="Trigger custom action"
        :icon="iconPlaceholder"
        @click="handleClick"
      />
    </template>
  </OnyxInput>
</template>
