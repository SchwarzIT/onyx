<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxInput, OnyxFormElementAction } from "sit-onyx";

const handleClick = () => {
  // implement your logic here...
};
</script>

<template>
  <OnyxInput label="Label" placeholder="Placeholder">
    <template #leadingIcons>
      <OnyxFormElementAction
        label="Trigger custom action"
        :icon="iconPlaceholder"
        highlighted="auto"
        @click="handleClick"
      />
    </template>
  </OnyxInput>
</template>
